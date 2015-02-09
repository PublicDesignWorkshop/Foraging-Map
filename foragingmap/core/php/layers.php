<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    require('database.php');
    function getConnection() {
        $db = new database;
        $dbhost = $db->host;
        $dbport = $db->port;
        $dbuser = $db->username;
        $dbpass = $db->password; 
        $dbname = $db->db_name;
        $dbh = new PDO("mysql:host=$dbhost;port=$dbport;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            read();
            break;
    }
    
    function read() {
        $sql = "SELECT * FROM `fm_layer` ORDER BY `name` ASC";
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                
            );
        } else {
            $params = array(
                
            );
        }
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);
            $pdo = null;
            echo json_encode($result);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
?>