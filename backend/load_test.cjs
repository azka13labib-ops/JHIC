const autocannon = require('autocannon');

const url = 'http://localhost:8000/api/school-info'; // Menguji endpoint cache
const duration = 10; // 10 detik tiap skenario untuk test lokal

async function runTest(title, connections) {
    console.log(`\n=== Memulai Skenario: ${title} ===`);
    console.log(`Virtual Users (Connections): ${connections}, Durasi: ${duration}s`);
    
    return new Promise((resolve) => {
        const instance = autocannon({
            url,
            connections,
            duration,
        }, (err, result) => {
            if (err) {
                console.error('Error:', err);
                resolve();
                return;
            }
            
            console.log(`\n[HASIL ${title}]`);
            console.log(`- Request Selesai: ${result.requests.total}`);
            console.log(`- Throughput: ${result.requests.average} req/sec`);
            console.log(`- Latency Rata-rata: ${result.latency.average} ms`);
            console.log(`- Timeout / Error: ${result.errors} / ${result.timeouts}`);
            console.log(`- Error Rate: ${((result.errors + result.timeouts) / result.requests.total * 100).toFixed(2)}%`);
            resolve();
        });
        
        autocannon.track(instance, { renderProgressBar: true });
    });
}

async function start() {
    console.log("Menyiapkan Stress Test JIHC API...");
    // 1. Normal Load
    await runTest("Normal Load", 50);
    // 2. Peak Load
    await runTest("Peak Load", 200);
    // 3. Stress Test
    await runTest("Stress Test", 500);
    
    console.log("\n=== Stress Test Selesai ===");
}

start();
