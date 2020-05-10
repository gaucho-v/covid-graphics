import React, {PureComponent} from 'react'
import styled from "styled-components";
import Graphic from "../Graphic/Graphic";


class Main extends PureComponent {
   render () {
     const {data, cities, isUpdate} = this.props;
     return (
       <Graphics>
         {cities.map((place, index) => {
           const citiesData = data.find(el => el.ru.toUpperCase() === place.toUpperCase());
           if (!citiesData) {
             return null
           }
           const {statistics} = citiesData;
           const placeName = place.toUpperCase();
           return (
             <Graphic key={index + place} statistics={statistics} placeName={placeName} isUpdate={isUpdate} index={index}/>
           )
         })
         }
       </Graphics>
     )
   }
}

export default Main


const Graphics = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;


