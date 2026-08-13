<?php
$html = shell_exec('curl.exe -s http://127.0.0.1:8000/api/news');
preg_match('/<title>(.*?)<\/title>/s', $html, $title);
preg_match('/"message"\:"(.*?)"/s', $html, $message);
preg_match('/"exception"\:"(.*?)"/s', $html, $exception);
echo "Title: " . ($title[1] ?? 'N/A') . "\nMessage: " . ($message[1] ?? 'N/A') . "\nException: " . ($exception[1] ?? 'N/A') . "\n";
