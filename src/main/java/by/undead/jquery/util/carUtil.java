package by.undead.jquery.util;

import by.undead.jquery.dao.Dao;
import by.undead.jquery.dao.DaoImpl;
import by.undead.jquery.model.Car;
import org.bson.types.ObjectId;

/**
 * Created by
 * User: Khralovich Dzmitry
 * Date: 27.06.13
 * Time: 9:30
 */
public class carUtil {

    public static void main(String[] args) {

        Dao dao = new DaoImpl();

        Car car = new Car();
        car.setId(new ObjectId().toString());
        car.setName("Opel");
        car.setColor("green");
        car.setCost("10 000");
        car.setDescription("It is a usual car");
        car.setYear("1990");
        dao.create(car);

        car = new Car();
        car.setId(new ObjectId().toString());
        car.setName("BMW");
        car.setColor("black");
        car.setCost("20 000");
        car.setDescription("It is a good car");
        car.setYear("2000");
        dao.create(car);

        car = new Car();
        car.setId(new ObjectId().toString());
        car.setName("Ferrari");
        car.setColor("red");
        car.setCost("50 000");
        car.setDescription("It is a very good car");
        car.setYear("2005");
        dao.create(car);


    }
}
