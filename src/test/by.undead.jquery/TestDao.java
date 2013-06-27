package by.undead.jquery;

import by.undead.jquery.model.Car;
import by.undead.jquery.dao.Dao;
import by.undead.jquery.dao.DaoImpl;
import org.bson.types.ObjectId;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

/**
 * Created by
 * User: Khralovich Dzmitry
 * Date: 25.06.13
 * Time: 16:26
 */
public class TestDao {

    Dao dao = new DaoImpl();
    String newID;


    public Car getNewCar() {
        Car car = new Car();
        car.setId(new ObjectId().toString());
        newID = car.getId();
        car.setName("Opel");
        car.setColor("red");
        car.setCost("10 000");
        return car;
    }

    @Test
    public void testCRUD(){
        testCreate();
        testRead();
        testReadAll();
        testUpdate();
        testDelete();
    }

    //@Test
    public void testCreate() {
        Car car = dao.create(getNewCar());
        Assert.assertNotNull(car);
    }

    //@Test
    public void testRead() {
        Car car = dao.read(newID);
        Assert.assertNotNull(car);
    }

    //@Test
    public void testReadAll() {
        List<Car> cars = dao.readAll();
        Assert.assertNotNull(cars);
    }

    //@Test
    public void testUpdate() {
        Car car = dao.read(newID);
        car.setName("New name");
        car = dao.update(car);
        Assert.assertNotNull(car);
    }

    //@Test
    public void testDelete() {
        dao.delete(newID);
    }

}
