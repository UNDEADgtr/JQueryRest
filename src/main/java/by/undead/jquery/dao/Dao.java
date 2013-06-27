package by.undead.jquery.dao;

import by.undead.jquery.model.Car;

import java.io.Serializable;
import java.util.List;

/**
 * Created by
 * User: Khralovich Dzmitry
 * Date: 25.06.13
 * Time: 15:43
 */
public interface Dao extends Serializable {

    Car create(Car car);

    Car read(String id);

    List<Car> readAll();

    Car update(Car car);

    void delete(Car car);

    void delete(String id);
}
