package com.thowl.Flut.core;

import com.thowl.Flut.storage.entities.Building;
import com.thowl.Flut.storage.entities.Map;

public interface SpielService {
    public Building getBuildingbyId(Building id); //Wenn das Objekt aufgelevelt wird dann einfach nächste Id übergebens
    public Map getMapbyId(Map id);
}
