<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    require('database.php');
	$filename = 'foragingmap.sql';
	
	
	$db = new database;
	$dbhost = $db->host;
	$dbuser = $db->username;
	$dbpass = $db->password; 
	$dbname = $db->db_name;

	// Create connection
	$conn = new mysqli($dbhost, $dbuser, $dbpass);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	// Create database
	$sql = "CREATE DATABASE ".$dbname;
	if ($conn->query($sql) === TRUE) {
		echo "Database created successfully.\r\n";
	} else {
		echo "Error creating database: " . $conn->error."\r\n";
	}
	$conn->close();
	
	// Create tables
	mysql_connect($dbhost, $dbuser, $dbpass) or die('Error connecting to MySQL server: ' . mysql_error());
	// Select database
	mysql_select_db($dbname) or die('Error selecting MySQL database: ' . mysql_error());

	// Temporary variable, used to store current query
	$sql = '';
	// Read in entire file
	$lines = file($filename);
	// Loop through each line
	foreach ($lines as $line) {
		// Skip it if it's a comment
		if (substr($line, 0, 2) == '--' || $line == '') {
			continue;
		}
		// Add this line to the current segment
		$sql .= $line;
		// If it has a semicolon at the end, it's the end of the query
		if (substr(trim($line), -1, 1) == ';') {
			// Perform the query
			$result = mysql_query($sql) or print('Error performing query \'<strong>' . $sql . '\': ' . mysql_error() . '<br /><br />');
			// Reset temp variable to empty
      if ($result == 1) {
        echo "Table created successfully.\r\n";
      } else {
        echo "Failed to create table.\r\n";
      }
			$sql = '';
		}
	}
?>