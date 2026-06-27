<?php

require __DIR__ . '/vendor/PHPMailer/src/Exception.php';
require __DIR__ . '/vendor/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/vendor/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed',
    ]);

    exit;
}

$config = require __DIR__ . '/config.php';

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

$mail = new PHPMailer(true);

try {
  $mail->CharSet = 'UTF-8';

  $mail->isSMTP();
  $mail->Host = $config['smtp']['host'];
  $mail->SMTPAuth = true;
  $mail->Username = $config['smtp']['username'];
  $mail->Password = $config['smtp']['password'];
  $mail->Port = $config['smtp']['port'];

  if ($config['smtp']['encryption'] === 'ssl') {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  } elseif ($config['smtp']['encryption'] === 'tls') {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  }

  $mail->setFrom(
    $config['mail']['from_email'],
    $config['mail']['from_name']
  );

  foreach ($config['mail']['recipients'] as $recipient) {
    $mail->addAddress($recipient['email'], $recipient['name']);
  }

  if ($email !== '') {
    $mail->addReplyTo($email, $name);
  }

  $mail->isHTML(true);
  $mail->Subject = $config['mail']['subject'];

  $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
  $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
  $safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
  $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

  $data = [
    'name' => $safeName,
    'email' => $safeEmail,
    'phone' => $safePhone,
    'message' => $safeMessage,
  ];

  $labels = [
    'name' => 'Имя',
    'email' => 'Email',
    'phone' => 'Телефон',
    'message' => 'Сообщение',
  ];

  $bodyParts = ["<h2>Запрос на конфиденциальную консультацию</h2>"];

  foreach ($data as $key => $value) {
    if ($value !== '') {
      $label = $labels[$key];
      $bodyParts[] = $key === 'message'
        ? "<p><b>{$label}:</b><br>{$value}</p>"
        : "<p><b>{$label}:</b> {$value}</p>";
    }
  }

  $mail->Body = implode("\n", $bodyParts);

  $altParts = ["Запрос на конфиденциальную консультацию"];

  foreach ($data as $key => $value) {
      if ($value !== '') {
          $label = $labels[$key];

          if ($key === 'message') {
              $altParts[] = "{$label}:\n{$value}";
          } else {
              $altParts[] = "{$label}: {$value}";
          }
      }
  }

  $mail->AltBody = implode("\n\n", $altParts);

  $mail->send();

  echo json_encode([
    'success' => true,
    'message' => 'Message sent',
  ]);
} catch (Exception $e) {
  http_response_code(500);

  echo json_encode([
    'success' => false,
    'message' => 'Message could not be sent',
    'error' => $mail->ErrorInfo,
    'exception' => $e->getMessage(),
  ]);
}