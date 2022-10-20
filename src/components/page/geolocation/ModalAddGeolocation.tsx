import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import React, {useState} from "react"
import {LatLng} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import './modalAddGeolocation.scss'
import LocationMarker from "./LocationMarker"
import LeafletMap from "./LeafletMap"
import GeocodeData from "./GeocodeData"

interface props {
    triggerModalAddGeolocationOpen: () => void,
    modalAddGeolocationOpen: boolean
}


function ModalAddGeolocation({triggerModalAddGeolocationOpen, modalAddGeolocationOpen,  }: props) {
  const [markerLatitude, setmarkerLatitude] = useState(51.505)
  const [markerLongitude, setmarkerLongitude] = useState(-0.09)
  const [mapZoom, setmapZoom] = useState(1)
  const [gpsLocationErrorMessage, setgpsLocationErrorMessage] = useState("")
  const [mapCentre, setmapCentre] = useState(new LatLng(51.505, -0.09))
  const [paintedMapChecked, setpaintedMapChecked] = useState(true)
  const [checkmarkAddLocationDescription, setcheckmarkAddLocationDescription] = useState(true)
  const [geocodeDataOutput, setgeocodeDataOutput] = useState("")

    function triggerSaveMap (e: any) {      
    }

    function changeLatitude (e :  React.ChangeEvent<HTMLInputElement>) {
        setmarkerLatitude(Number(e.target.value))
    }
     
    function changeLongitude (e: React.ChangeEvent<HTMLInputElement>) {
        setmarkerLongitude(Number(e.target.value))
    }

    function changeCenter (newCenter: LatLng){
      setmapCentre(newCenter)
    }

    function changeZoom(newZoom :number){
    }

    function changeGeocodeDataOutput(newGeocodeDataOutput : string){
      setgeocodeDataOutput(newGeocodeDataOutput)
    }

    function changeMarkerLatitude(newLatitude : number){
      setmarkerLatitude(newLatitude)
    }

    function changeMarkerLongitude(newLongitude : number){
        setmarkerLongitude(newLongitude)
    }

  return (
    <Modal className='geolocationModal' show={modalAddGeolocationOpen} onHide={triggerModalAddGeolocationOpen}>
    <Modal.Header closeButton>
      <Modal.Title>Enter your location</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <Form.Label>Lattitude</Form.Label>
            &nbsp;
            &nbsp;
            <Form.Control type="number" value={Math.round(markerLatitude * 100) / 100}  onChange = {changeLatitude} placeholder="Lattitude" />
            &nbsp;
            &nbsp;
            <Form.Label>Longitude</Form.Label>
            &nbsp;
            &nbsp;
            <Form.Control type="number" value={Math.round(markerLongitude * 100) / 100} onChange = {changeLongitude} placeholder="Longitude" />
          </div>
            <LeafletMap paintedMapChecked={paintedMapChecked} markerLatitude = {markerLatitude} markerLongitude = {markerLongitude} mapCentre = {mapCentre} changeCenter={changeCenter} mapZoom = {mapZoom} changeZoom = {changeZoom} changeMarkerLatitude = {changeMarkerLatitude} changeMarkerLongitude = {changeMarkerLongitude}></LeafletMap>
            <code className = "gpsLocationErrorMessage">{gpsLocationErrorMessage}</code>
            <h4>{checkmarkAddLocationDescription ? <GeocodeData changeGeocodeDataOutput = {changeGeocodeDataOutput} mapCentre = {mapCentre} geocodeDataOutput = {geocodeDataOutput} ></GeocodeData> : <></>}</h4>
            <div className='checkMarkMapLayerSection'>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onClick={() => {setcheckmarkAddLocationDescription(!checkmarkAddLocationDescription)}} checked = {checkmarkAddLocationDescription} id="flexCheckDefault"/>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Add location description
              </label>
            </div>
            
            </div>  
            
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={triggerModalAddGeolocationOpen}>
        Close
      </Button>
      <Button variant="success" onClick={triggerSaveMap}>
        Add to page
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default ModalAddGeolocation