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
        $sql = "SELECT * FROM `fm_item` WHERE (`id` = :id)";
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
        $sql = "UPDATE `fm_item` SET `name` = :name, `desc` = :desc, `serial` = :serial, `type` = :type, `sort` = :sort, `amount` = :amount, `lat` = :lat, `lng` = :lng, `update` = :update  WHERE (`id` = :id)";
        $data = json_decode(file_get_contents('php://input'));
        $params = array(
            "id" => $data->{'id'},
            "name" => $data->{'name'},
            "desc" => $data->{'desc'},
            "serial" => $data->{'serial'},
            "type" => $data->{'type'},
            "sort" => $data->{'sort'},
            "amount" => $data->{'amount'},
            "lat" => $data->{'lat'},
            "lng" => $data->{'lng'},
            "update" => date("Y-m-d H:i:s"),
        );
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $sql = "SELECT * FROM `fm_item` WHERE `id` = :id";
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
            $pos = strpos($e->getMessage(), "Duplicate");
            if ($pos !== false) {
                $sql = "SELECT * FROM `fm_item` WHERE `serial` = :serial";
                $params = array(
                    "serial" => $data->{'serial'},
                );
                
                try {
                    $result = "Duplicate:";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute($params);
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($arr as $titleData) {
                        $result.=$titleData['name'];
                    }
                    echo $result;
                } catch(PDOException $e) {
                    
                }
            }
            //echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
    
    function create() {
        $sql = "INSERT INTO `fm_item` VALUES ( NULL, :name, :desc, :serial, :type, :sort, :amount, :lat, :lng, :regdate, :update )";
        $data = json_decode(file_get_contents('php://input'));
        $params = array(
            "name" => $data->{'name'},
            "desc" => $data->{'desc'},
            "serial" => $data->{'serial'},
            "type" => $data->{'type'},
            "sort" => $data->{'sort'},
            "amount" => $data->{'amount'},
            "lat" => $data->{'lat'},
            "lng" => $data->{'lng'},
            "regdate" => date("Y-m-d H:i:s"),
            "update" => date("Y-m-d H:i:s"),
        );
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $sql = "SELECT * FROM `fm_item` WHERE `id` = :id";
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
    
    function delete() {
        $sql = "DELETE FROM `fm_item` WHERE `id` = :id";
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
    
?>