<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    require('database.php');	
    function getConnection() {
        $db = new database;
        $dbhost = $db->host;
        $dbuser = $db->username;
        $dbpass = $db->password; 
        $dbname = $db->db_name;
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            create();
            break;
        case 'GET':
            read();
            break;
        case 'PUT':
            update();
            break;
        case 'DELETE':
            delete();
            break;
    }
    
    function read() {
        $sql = "SELECT * FROM `fm_bend` WHERE (`id` = :id)";
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                "id" => $data->{'id'},
            );
        } else {
            $params = array(
                "id" => $_GET['id'],
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
    
    function update() {
        $sql = "UPDATE `fm_threshold` SET `pid` = :pid, `type` = :type, `min` = :min, `max` = :max, `date` = :date, `update` = :update  WHERE (`id` = :id)";
        $data = json_decode(file_get_contents('php://input'));
        $params = array(
            "id" => $data->{'id'},
            "pid" => $data->{'pid'},
            "type" => $data->{'type'},
            "min" => $data->{'min'},
            "max" => $data->{'max'},
            "date" => $data->{'date'},
            "update" => date("Y-m-d H:i:s"),
        );
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $sql = "SELECT * FROM `fm_threshold` WHERE (`id` = :id)";
            $params = array(
                "id" => $data->{'id'},
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
    
    function delete() {
        $sql = "DELETE FROM `fm_threshold` WHERE `id` = :id";
        $data = json_decode(file_get_contents('php://input'));
        $params = array(
            "id" => $data->{'id'},
        );
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute($params);
            $pdo = null;
            echo json_encode($result);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
    
    function create() {
        $sql = "INSERT INTO `fm_threshold` VALUES ( NULL, :pid, :type, :min, :max, :date, :update )";
        $data = json_decode(file_get_contents('php://input'));
        $params = array(
            "pid" => $data->{'pid'},
            "type" => $data->{'type'},
            "min" => $data->{'min'},
            "max" => $data->{'max'},
            "date" => $data->{'date'},
            "update" => date("Y-m-d H:i:s"),
        );
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $sql = "SELECT * FROM `fm_threshold` WHERE `id` = :id";
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