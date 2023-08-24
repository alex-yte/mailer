<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['fname'];
$famName = $_POST['lname'];


//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'testovich1976@inbox.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'HLkYM68NL8cHBL5Evr5M'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('testovich1976@inbox.ru'); // от кого будет уходить письмо?
$mail->addAddress('den.alex.chirkov@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с продакшена';
$mail->Body    = 'Заявка от: ' .$name . '<br>Номер телефона: ' .$famName;
$mail->AltBody = '';

if(!$mail->send()){
    $message= "Error";
}else{
    $message="The form has been sent, thank you!";
}
$response = ['message'=>$message];

header('content-type: application/json');
echo json_encode($response);
?>