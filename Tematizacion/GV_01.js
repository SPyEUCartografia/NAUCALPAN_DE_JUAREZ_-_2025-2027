// BASEMAPS //
let osm = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
let hdm = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
let esrisat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
let esrigray = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
//  CONFIGURACIÓN LIENZO //
let map = L.map('map', {
    layers: [hdm],
    tap: false,
    center: new L.LatLng(19.4750, -99.3050),
    zoom: 12,
    minZoom: 10,
    fullscreenControl: true,
    fullscreenControlOptions: {
        title: 'Activar Pantalla completa',
        titleCancel: 'Apagar Pantalla completa'
    }
});
map.on('Activar Pantalla completa',
    function () {
        if (window.console) window.console.log('Activar Pantalla completa');
});
map.on('Apagar Pantalla completa',
    function () {
        if (window.console) window.console.log('Apagar Pantalla completa');
});
let toggleFullscreen = function () {
map.toggleFullscreen();
};
// TITULO //
let info = L.control();
    info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
        return this._div;
        };
        info.update = function (props) {
            this._div.innerHTML = `<h3>NAUCALPAN DE JUÁREZ - USO DE SUELO NORMATIVO</h3>`;
        };
        info.addTo(map);
// SIDEPANEL CARACTERISITCAS//
let sidepanelLeft = L.control.sidepanel('mySidepanelLeft', {
    tabsPosition: 'left',
    darkMode: true,
    startTab: 'tab-1'
}).addTo(map);
// COORDINATES PROJECTION (VISUALIZADOR DE COORDENADAS) //
let EPSG4326 = new L.Proj.CRS('EPSG:4326');
L.control.coordProjection({
    position: 'bottomleft',
    crs: EPSG4326,
}).addTo(map);
// ESCALA //
let Escala = L.control.scale({ position: 'bottomright'}).addTo(map);
// MINIBASEMAP //
let MMUrl='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
let MMap = new L.TileLayer(MMUrl, {minZoom: 0, maxZoom: 10,});
let miniMap = new L.Control.MiniMap(MMap, { toggleDisplay: true, position: 'bottomleft'}).addTo(map);					
// CARTOGRAFIA GEOJSON (CAPAS) //
// POLIGONOS (CAPAS) //
let AG01 = L.geoJson(ag_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#876e41',
                fillColor: '#d7af69',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let AV01 = L.geoJson(av_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#4b7300',
                fillColor: '#aacd64',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);
    
let CA01 = L.geoJson(ca_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#bee6fa',
                fillColor: '#d5eefa',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);
    
let CU01 = L.geoJson(cu_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#cd6666',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let EQ01 = L.geoJson(e_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#002673',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let EQ02 = L.geoJson(e_02, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#7a8ef5',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);
    
let EQ03 = L.geoJson(e_03, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#bed2ff',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);
    
let HA01 = L.geoJson(h_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#ffe62f',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);
    
let HA0201 = L.geoJson(h_02_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#fff064',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let HA0202 = L.geoJson(h_02_02, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#fff064',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let HA0203 = L.geoJson(h_02_03, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#fff064',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let HA0204 = L.geoJson(h_02_04, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#fff064',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let HA0205 = L.geoJson(h_02_05, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#fff064',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let HA03 = L.geoJson(h_03, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#ffd230',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);
    
let IN01 = L.geoJson(ind_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#ffffff',
                fillColor: '#a05ac8',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let NA01 = L.geoJson(nat_01, {style: function (feature){
    return {
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1,
                color: '#4b7300',
                fillColor: '#5a8741',
    };}}).bindPopup(function (layer){
        return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</div><hr><table><tr><td>Clave del Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_02 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_02 +
            "</td></tr><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave de la Comunidad: " + layer.feature.properties.CVECOL +
            "</td></tr><tr><td>Nombre de la Comunidad: " + layer.feature.properties.NOMCOL +
            "</td></tr><tr><td>Número Máximo de Habitantes por Hectárea: " + layer.feature.properties.DENS_01 +   
            "</td></tr><tr><td>Número Máximo de viviendas por Hectárea: " + layer.feature.properties.DENS_02 +
            "</td></tr><tr><td>Metros cuadrados de terreno bruto por vivienda: " + layer.feature.properties.DENS_03 +
            "</td></tr><tr><td>Metros cuadrados de terreno neto por vivienda: " + layer.feature.properties.DENS_04 +
            "</td></tr><tr><td>Frente en metros: " + layer.feature.properties.LOTE_01 +
            "</td></tr><tr><td>Superficie en metros cuadrados: " + layer.feature.properties.LOTE_02 +   
            "</td></tr><tr><td>Número máximo de viviendas por lote mínimo: " + layer.feature.properties.LOTE_03 +
            "</td></tr><tr><td>CAS 1: Porcentaje de Área Libre (%): " + layer.feature.properties.SMSC_01 +
            "</td></tr><tr><td>CAS 2: Porcentaje de Área Verde (%): " + layer.feature.properties.SMSC_02 +
            "</td></tr><tr><td>COS: Porcentaje máximo de superficie de desplante de la construcción (%) (Coeficiente máximo de Ocupación del Suelo): " + layer.feature.properties.SMDC_01 +
            "</td></tr><tr><td>Número máximo de niveles de construcción: " + layer.feature.properties.AMC_01 +
            "</td></tr><tr><td>Altura máxima en metros sobre el nivel de desplante: " + layer.feature.properties.AMC_02 +
            "</td></tr><tr><td>CUS: Coeficiente máximo de Utilización del Suelo (Intensidad Máxima de Construcción): " + layer.feature.properties.SMC_01 +
            "</td></tr></table>"
    }).addTo(map);

let CRU01 = L.geoJSON(cru_01, {style: function (feature){
    switch(String(feature.properties['CVEUDS_01'])) {
    case 'CRU-125-A':
    return {
        color: "#ff0000",
        weight: 3,
        opacity: 1,
        };
    case 'CRU-200-A':
    return {
        color: "#ffaa00",
        weight: 3,
        opacity: 1,
        };
    case 'CRU-200-B':
    return {
        color: "#ffaa00",
        weight: 3,
        opacity: 1,
        };
    case 'CRU-300-A':
    return {
        color: "#55ff00",
        weight: 3,
        opacity: 1,
        };
    case 'CRU-300-B':
    return {
        color: "#55ff00",
        weight: 3,
        opacity: 1,
        };
    case 'CRU-500-A':
    return {
        color: "#c3a0d7",
        weight: 3,
        opacity: 1,
        };
    case 'CRU-300-A':
    return {
        color: "#c3a0d7",
        weight: 3,
        opacity: 1,
        }; 
    };}}).bindPopup(function (layer){
    return "<div style=text-align:center><h4>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_01 +
            "</div><hr><table><tr><td>Clave del Distrito: " + layer.feature.properties.CVEDIST  +
            "</td></tr><tr><td>Nombre del Distrito: " + layer.feature.properties.NOMDIST +
            "</td></tr><tr><td>Clave Uso de Suelo Normativo: " + layer.feature.properties.CVEUDS_01 +
            "</td></tr><tr><td>Descripción del Uso de Suelo Normativo: " + layer.feature.properties.NOMUDS_01 +
            "</td></tr></table>"
    }).addTo(map);

// ACTIVAR CAPAS //
let baseLayers = {
        'OpenStreetMap Humanitarian': hdm,
        'OpenStreetMap Standard': osm,
        'ESRI Satelital': esrisat,
        'ESRI Dark Basemap': esrigray,
    };               
let overlays = {
        "Agrícola": AG01,
        "Área Verde": AV01,
        "Cuerpos de Agua": CA01,
        "Natural": NA01,
        "Centros Urbanos": CU01,
        "Equipamiento": EQ01,
        "Equipamiento Especial": EQ02,
        "Habitacional Densidad Alta a Muy Alta": HA01,
        "Habitacional Densidad Media - Del Distrito 01 - Distrito 03": HA0201,
        "Habitacional Densidad Media - Del Distrito 04 - Distrito 06": HA0202,
        "Habitacional Densidad Media - Del Distrito 07 - Distrito 08": HA0203,
        "Habitacional Densidad Media - Distrito 09": HA0204,
        "Habitacional Densidad Media - Del Distrito 10 - Distrito 27": HA0205,
        "Habitacional Densidad Baja a Muy Baja": HA03,
        "Industria": IN01,
        "Infraestructura": EQ03,
        "Corredores Urbanos": CRU01,
    };
let layerControl = L.control.layers(baseLayers, overlays, {collapsed: false,}).addTo(map);
// RESET VIEW (REGRESAR VISTA IN INICIAL) //
L.control.resetView({
    position: "topleft",
    title: "Posición inicial",
    latlng: L.latLng([19.4750, -99.3050]),
    zoom: 12,
}).addTo(map);
