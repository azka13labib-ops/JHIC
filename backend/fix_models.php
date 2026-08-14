<?php
$models = array("Agenda", "Article", "Guestbook", "Opinion", "Blog", "QuickLink", "Gallery", "StudentWork");
foreach($models as $model) {
    $content = "<?php\n\nnamespace App\Models;\n\nuse Illuminate\Database\Eloquent\Factories\HasFactory;\nuse Illuminate\Database\Eloquent\Model;\n\nclass $model extends Model\n{\n    use HasFactory;\n    protected \$guarded = [];\n}\n";
    file_put_contents(__DIR__ . "/app/Models/$model.php", $content);
}
