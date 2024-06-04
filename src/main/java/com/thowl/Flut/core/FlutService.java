package com.thowl.Flut.core;

import java.util.ArrayList;

import com.thowl.Flut.storage.entities.Building;
import com.thowl.Flut.storage.entities.Map;

public interface FlutService {
    public Building getBuildingbyId(Building id); //Wenn das Objekt aufgelevelt wird dann einfach nächste Id übergebens
    public ArrayList<Building> getBuildings();
    public Map getMapbyId(Map id);
}
