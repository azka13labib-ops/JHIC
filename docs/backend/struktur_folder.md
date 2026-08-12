# Struktur Folder Backend (Laravel)

Menggunakan pola **Repository Pattern + Service Layer** untuk memisahkan *business logic* dari *controller*, sehingga kode lebih bersih, mudah ditest, dan mudah di-maintain.

---

## 📁 Struktur Lengkap

```
backend/
└── app/
    ├── Console/
    │   └── Commands/               # Artisan command kustom (cron job, seeder manual, dll)
    │
    ├── Contracts/
    │   └── Interfaces/
    │       ├── Eloquent/           # Interface untuk Eloquent Repository (abstraksi DB)
    │       └── data/               # Interface untuk Data Transfer Object (DTO)
    │
    ├── Enums/                      # PHP Enum: konstanta terstruktur (Status, Role, dll)
    │
    ├── Helpers/                    # Fungsi-fungsi helper global (format tanggal, dll)
    │
    ├── Http/
    │   ├── Controllers/            # Hanya menerima request & mengembalikan response
    │   │   ├── Api/                # Controller khusus API (JSON response)
    │   │   └── Admin/              # Controller untuk panel Admin (Filament)
    │   ├── Middleware/             # Filter request (auth, role, rate limit, cors)
    │   ├── Requests/               # Form Request: validasi & otorisasi input
    │   └── Resources/              # API Resource: format/transform output JSON
    │
    ├── Jobs/                       # Queue Jobs: tugas yang diproses di background
    │   │                           # (contoh: SendPPDBNotificationEmail)
    │
    ├── Mail/                       # Mailable class: template email (PPDB, Inquiry)
    │
    ├── Models/                     # Eloquent Model: representasi tabel database
    │
    ├── Providers/                  # Service Provider: binding dependensi ke container
    │
    ├── Repositories/               # Lapisan akses database (implementasi Interface)
    │   │                           # Semua query Eloquent/DB ada di sini, bukan di Controller
    │   ├── UserRepository.php
    │   ├── RegistrationRepository.php
    │   └── ProductRepository.php
    │
    └── Services/                   # Business Logic: kalkulasi, orkestrasi, keputusan
        │                           # Dipanggil oleh Controller, memanggil Repository
        ├── PpdbService.php
        ├── ChatBotService.php
        └── ProductService.php
```

```
HTTP Request
     │
     ▼
[ Middleware ]        → Cek auth, rate limit, CORS
     │
     ▼
[ Controller ]        → Terima input, panggil Service, kembalikan response
     │
     ▼
[ Form Request ]      → Validasi & otorisasi input (dijalankan otomatis)
     │
     ▼
[ Service ]           → Business logic (kalkulasi, kondisi, keputusan)
     │
     ▼
[ Repository ]        → Query database via Eloquent (gunakan Interface)
     │
     ▼
[ Model / Eloquent ]  → Representasi tabel, relasi, accessor/mutator
     │
     ▼
[ API Resource ]      → Transform data Model menjadi format JSON yang bersih
     │
     ▼
HTTP Response (JSON)
```

---

## 📝 Penjelasan Per Folder

### `Console/Commands/`
Artisan command kustom yang bisa dijalankan via CLI atau dijadwalkan di Kernel.
```php
// Contoh: php artisan ppdb:send-reminder
class SendPpdbReminderCommand extends Command { ... }
```

### `Contracts/Interfaces/`
Kontrak/antarmuka yang mendefinisikan "apa yang bisa dilakukan" tanpa mendefinisikan "bagaimana caranya". Memudahkan *unit testing* karena bisa di-mock.
```php
// Eloquent/RegistrationRepositoryInterface.php
interface RegistrationRepositoryInterface {
    public function findByUser(int $userId): ?Registration;
    public function create(array $data): Registration;
}
```

### `Enums/`
Menggantikan "magic string" dengan konstanta yang aman dan ter-autocomplete.
```php
// Enums/RegistrationStatus.php
enum RegistrationStatus: string {
    case Pending   = 'pending';
    case Accepted  = 'diterima';
    case Rejected  = 'ditolak';
}
```

### `Helpers/`
Fungsi-fungsi global yang tidak perlu dibuat sebagai class.
```php
// Helpers/FormatHelper.php
function formatNisn(string $nisn): string { ... }
```

### `Http/Controllers/`
**Sangat tipis (thin controller)**. Tidak boleh ada business logic di sini.
```php
public function store(StorePpdbRequest $request, PpdbService $service): JsonResponse {
    $result = $service->submitRegistration($request->validated(), auth()->user());
    return new RegistrationResource($result);
}
```

### `Http/Requests/`
Semua validasi input ada di sini, bukan di Controller.
```php
// Requests/StorePpdbRequest.php
public function rules(): array {
    return [
        'nama_lengkap' => 'required|string|max:255',
        'nisn'         => 'required|digits:10|unique:registrations',
        'foto_kk'      => 'required|file|mimes:jpg,png,pdf|max:2048',
    ];
}
```

### `Http/Resources/`
Mengontrol persis data apa yang boleh keluar ke response API. Hindari `$model->toArray()`.
```php
// Resources/RegistrationResource.php
public function toArray(Request $request): array {
    return [
        'id'     => $this->id,
        'nama'   => $this->nama_lengkap,
        'status' => $this->status->label(), // Pakai Enum method
        // ❌ Jangan expose: 'password', 'nik', 'created_at' (jika tidak perlu)
    ];
}
```

### `Jobs/`
Tugas berat yang dijalankan secara asinkron di background Queue.
```php
// Jobs/SendPpdbConfirmationEmail.php
class SendPpdbConfirmationEmail implements ShouldQueue {
    public function handle(): void {
        Mail::to($this->user)->send(new PpdbConfirmationMail($this->registration));
    }
}
```

### `Repositories/`
Satu-satunya tempat query Eloquent/DB berada. Controller dan Service tidak boleh memanggil Model langsung.
```php
// Repositories/RegistrationRepository.php
class RegistrationRepository implements RegistrationRepositoryInterface {
    public function findByUser(int $userId): ?Registration {
        return Registration::with('documents')->where('user_id', $userId)->first();
    }
}
```

### `Services/`
Tempat business logic tinggal. Boleh memanggil beberapa Repository, memutuskan alur, dan melakukan kalkulasi.
```php
// Services/PpdbService.php
class PpdbService {
    public function submitRegistration(array $data, User $user): Registration {
        // 1. Simpan data pendaftaran
        $registration = $this->registrationRepo->create([...$data, 'user_id' => $user->id]);
        // 2. Dispatch job email ke background queue
        SendPpdbConfirmationEmail::dispatch($user, $registration);
        // 3. Return hasilnya
        return $registration;
    }
}
```

---

## ⚡ Keuntungan Struktur Ini

| Keuntungan | Penjelasan |
|---|---|
| **Mudah ditest** | Repository bisa di-mock, Service bisa ditest tanpa database |
| **Clean Code** | Controller tipis, tidak ada logic berserakan |
| **Mudah di-maintain** | Perubahan query hanya di satu tempat (Repository) |
| **Scalable** | Bisa ganti implementasi database tanpa ubah logic |
| **Impress juri** | Menunjukkan pemahaman arsitektur software yang matang |
