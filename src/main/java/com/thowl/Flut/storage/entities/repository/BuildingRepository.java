package com.thowl.Flut.storage.entities.repository;

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
}
