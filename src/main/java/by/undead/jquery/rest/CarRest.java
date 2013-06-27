package by.undead.jquery.rest;

import by.undead.jquery.dao.Dao;
import by.undead.jquery.dao.DaoImpl;
import by.undead.jquery.model.Car;
import org.bson.types.ObjectId;
import org.json.simple.JSONObject;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: Khralovich Dzmitry
 * Date: 25.06.13
 * Time: 16:18
 */
@Path("/cars")
public class CarRest {

    Dao dao = new DaoImpl();

    @GET
    public JSONObject readAll() {
        System.out.println("Reading all Car");

        JSONObject jsonObject = new JSONObject();

        Map<String, Object> map = new HashMap<String, Object>();

        List<Car> cars = dao.readAll();
        int i = 0;
        for (Car car : cars) {
            map.put(car.getId(), car.getAttributes());
            i++;
        }

        jsonObject.put("CARS", map);

        return jsonObject;
    }

    @GET
    @Path("/{id}")
    public JSONObject read(@PathParam("id") String id) {
//        System.out.println("Reading Car " + id);
//        return dao.read(id);
        return null;
    }

    @POST
    public JSONObject create(JSONObject car) {
        System.out.println("Creating Car");
        car.put("_id", (new ObjectId()).toString());
        Car newCar = new Car(car);
        dao.create(newCar);
        return readAll();
    }

    @PUT
    @Path("{id}")
    public JSONObject update(JSONObject car) {
        System.out.println("Updating Car");
        Car newCar = new Car(car);
        dao.update(newCar);
        return readAll();
    }

    @DELETE
    @Path("{id}")
    public JSONObject remove(@PathParam("id") String id) {
        System.out.println("Deleting Car");
        dao.delete(id);
        return readAll();
    }
}
