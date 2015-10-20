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
        case 'POST':
            create();
            break;
        case 'GET':
            create();
            break;
        case 'PUT':
            //update();
            break;
        case 'DELETE':
            //delete();
            break;
    }
    
    
    function create() {
        $pid = -1;
        
        $sql = "SELECT * FROM `fm_item` WHERE `serial` = :serial";
        $params = array(
            "serial" => $_GET["sid"],
        );
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
            
            foreach ($rows as $row) {
                $pid = $row->id;
            }
            
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    
        $sql = "INSERT INTO `fm_bend` VALUES ( NULL, :pid, :type, :value, :date, :update )";
        $data = json_decode(file_get_contents('php://input'));
        $params = array(
            "pid" => $pid,
            "value" => $_GET["value"],
            "type" => $_GET["type"],
            "date" => date("Y-m-d H:i:s"),
            "update" => date("Y-m-d H:i:s"),
        );
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $sql = "SELECT * FROM `fm_bend` WHERE `id` = :id";
            $params = array(
                "id" => $pdo->lastInsertId(),
            );
            try {
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
                $result = $stmt->fetchAll(PDO::FETCH_OBJ);
                $pdo = null;
                echo json_encode($result);
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
?>