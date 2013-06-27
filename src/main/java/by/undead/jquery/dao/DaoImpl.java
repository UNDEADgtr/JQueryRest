package by.undead.jquery.dao;

import by.undead.jquery.model.Car;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import java.io.Serializable;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by
 * User: Khralovich Dzmitry
 * Date: 25.06.13
 * Time: 15:50
 */
public class DaoImpl implements Dao, Serializable {

    public static final String BASE_NAME = "rest";
    public static final String COLLECTION_NAME = "cars";

    private MongoClient mongo;
    private DB db;


    public DaoImpl() {
        init();
    }

    public void init() {
        try {
            mongo = new MongoClient("localhost", 27017);
            db = mongo.getDB(BASE_NAME);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }


    @Override
    public Car create(Car car) {
        DBCollection table = db.getCollection(COLLECTION_NAME);
        BasicDBObject document = new BasicDBObject(car.getAttributes());
        table.insert(document);
        return car;
    }

    @Override
    public Car read(String id) {
        db = mongo.getDB(BASE_NAME);
        DBCollection table = db.getCollection(COLLECTION_NAME);
        DBObject document = table.findOne(new BasicDBObject("_id", id));
        return new Car(document.toMap());
    }

    @Override
    public List<Car> readAll() {
        List<Car> cars = new ArrayList<Car>();
        DBCollection table = db.getCollection(COLLECTION_NAME);

        for (DBObject object : table.find()) {
            cars.add(new Car(object.toMap()));
        }
        return cars;
    }

    @Override
    public Car update(Car car) {
        DBCollection table = db.getCollection(COLLECTION_NAME);
        table.save(new BasicDBObject(car.getAttributes()));
        return car;
    }

    @Override
    public void delete(Car car) {
        DBCollection table = db.getCollection(COLLECTION_NAME);
        BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put("_id", car.getId());
        table.remove(searchQuery);

    }

    @Override
    public void delete(String id) {
        DBCollection table = db.getCollection(COLLECTION_NAME);
        BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put("_id", id);
        table.remove(searchQuery);
    }


}
