package by.undead.jquery.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

/**
 * Created by
 * User: Khralovich Dzmitry
 * Date: 25.06.13
 * Time: 13:21
 */

@Path(value = "/hello")
public class HelloWorldService {

    @GET
    @Path("/{param}")
    public Response getMsg(@PathParam("param") String msg) {

        String output = "Rest say : " + msg;

        return Response.status(200).entity(output).build();

    }

}
