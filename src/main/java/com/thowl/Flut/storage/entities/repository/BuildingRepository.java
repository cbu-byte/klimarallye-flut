package com.thowl.Flut.storage.entities.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.thowl.Flut.expections.NoSuchBuildingException;
import com.thowl.Flut.storage.entities.Building;

/**
 * A local storage for Building Instances
 * 
 */
@Repository
public interface BuildingRepository {
    public Building findbyId(int id) throws NoSuchBuildingException;
    public ArrayList<Building> findBuildings();
}
