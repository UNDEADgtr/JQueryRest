package by.undead.jquery.model;

import java.util.HashMap;
import java.util.Map;

/**
 * User: Khralovich Dzmitry
 * Date: 25.06.13
 * Time: 16:06
 */
public class Car {

    public static final String ID_KEY = "_id";
    public static final String NAME_KEY = "name";
    public static final String DESCRIPTION_KEY = "description";
    public static final String COLOR_KEY = "color";
    public static final String COST_KEY = "cost";
    public static final String YEAR_KEY = "year";

    private Map<String, Object> attributes;


    public Car() {
        this(new HashMap<String, Object>());
    }

    public Car(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Object getAttributeValue(String name) {
        return this.attributes.get(name);
    }

    public void setAttributeValue(String name, Object value) {
        this.attributes.put(name, value);
    }

    public String getId() {
        return (String) this.getAttributeValue(ID_KEY);
    }

    public void setId(String id) {
        this.setAttributeValue(ID_KEY, id);
    }

    public String getName() {
        return (String) this.getAttributeValue(NAME_KEY);
    }

    public void setName(String name) {
        this.setAttributeValue(NAME_KEY, name);
    }

    public String getDescription() {
        return (String) this.getAttributeValue(DESCRIPTION_KEY);
    }

    public void setDescription(String description) {
        this.setAttributeValue(DESCRIPTION_KEY, description);
    }

    public String getColor() {
        return (String) this.getAttributeValue(COLOR_KEY);
    }

    public void setColor(String color) {
        this.setAttributeValue(COLOR_KEY, color);
    }

    public String getCost() {
        return (String) this.getAttributeValue(COST_KEY);
    }

    public void setCost(String cost) {
        this.setAttributeValue(COST_KEY, cost);
    }

    public String getYear() {
        return (String) this.getAttributeValue(YEAR_KEY);
    }

    public void setYear(String year) {
        this.setAttributeValue(YEAR_KEY, year);
    }

}
