package com.thowl.Flut.core;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thowl.Flut.storage.entities.Building;
import com.thowl.Flut.storage.entities.repository.BuildingRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FlutServiceImpl {

    @Autowired
    private BuildingRepository buildings;

    public ArrayList<Building> getBuildings(){
        log.debug("entering getBuildings");
        ArrayList<Building> buildings = new ArrayList<Building>();
        buildings = this.buildings.findBuildings();
        
    	return buildings;
    }
}