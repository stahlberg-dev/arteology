<?php

return [
  'smtp' => [
    'host' => 'smtp.beget.com',
    'port' => 465,
    'username' => 'info@arteology.io',
    'password' => 'In_art_we_trust_2026',
    'encryption' => 'ssl',
  ],

  'mail' => [
    'from_email' => 'info@arteology.io',
    'from_name' => 'Arteology',
    'recipients' => [
      ['email' => 'denis.s@arteology.io', 'name' => 'Denis'],
      ['email' => 'Zalina.c@gmail.com', 'name' => 'Denis'],
      ['email' => 'zalina.s@arteology.io', 'name' => 'Zalina'],
      ['email' => 'Zalina.c@gmail.com', 'name' => 'Zalina'],
    ],
    'subject' => 'Запрос на конфиденциальную консультацию',
  ],
];