<?php // You need to add server side validation and better error handling here
 
$data = array();
$count = 0;
 
if(isset($_GET['files'])) {  
	$error = false;
	$files = array();
 
	$uploaddir = '../../content/picture/';
	foreach($_FILES as $file) {
		$fileName = basename($file['name']);
		while( file_exists($uploaddir.$fileName) ) {
			$info = pathinfo($fileName);
			$extension = $info['extension'];
			$name = str_replace(".".$extension, "", $fileName);
			
			$count++;
			$fileName = $name.'_'.$count.".".$extension;
		}
		if( move_uploaded_file($file['tmp_name'], $uploaddir.$fileName) ) {
			$files[] = $uploaddir.$fileName;
		} else {
		    $error = true;
		}
		/*
		if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name']))) {
			$files[] = $uploaddir .$file['name'];
		} else {
		    $error = true;
		}
		*/
	}
	$data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
} else {
	$data = array('success' => 'Form was submitted', 'formData' => $_POST);
}
 
echo json_encode($data);
 
?>