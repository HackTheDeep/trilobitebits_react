import React, { Component } from 'react';
import trilo from '../trilo.jpg';
import trilobite from '../trilobite.png';
import NavBar from './NavBar'

class About extends Component {
  render(){

    var h1 = {
      color: '#59abcf',
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 50
    }

    var p1 = {
      fontSize: 16,
      paddingTop: 60,
      paddingBottom: 60,
      paddingLeft: 80,
      paddingRight: 80,
      textAlign: 'center',
      background: '#ddd',
      margin: 80,
      marginTop: 50,
      borderRadius: 20
    }

    var h2 = {
      color: '#59abcf',
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 50
    }

    var p2 = {
      fontSize: 16,
      paddingTop: 60,
      paddingBottom: 60,
      paddingLeft: 80,
      paddingRight: 80,
      background: '#ddd',
      marginTop: 50,
      marginBottom: 80,
      marginLeft: 80,
      marginRight: 80,
      borderRadius: 20
    }

    return(
        <div>
          <NavBar />

          <h1 style = {h1}>About Trilobite Bits</h1>

          <img src={trilo} width="350" height="300" className="trilo-img" alt="Trilobite" />

            <p style = {p1}>Trilobites are an extinct group of arthropods.
            Although their body structure follows a similar three-lobed pattern
            from side to side and three-region pattern from front to back, they
            are extremely diverse in terms of their size and shape of those
            regions. Trilobite species size ranged from being in centimeters to
            very large in 3/4 of a meter. Some were smooth, some were bumpy or
            spiny, some had complex arrangements of furrows on the head or tail,
            some had stalked eyes, some had no eyes at all. Trilobites were very
            abundant and diverse, and lived in all different marine environments
            as a group for approximately 250 million years. This brings us to
            deep analysis and questions about evolution, diversification,
            biogeography, and past ecosystems.
            </p>

          <h2 style = {h2}>Objectives</h2>

          <img src={trilobite} width="380" height="280" className="trilobite-img" alt="Trilobite" />

            <p style = {p2}>Our objectives are:
              <ul>
                <li> To find the number of segments in the
                thorax of each specimen </li>
                <li> Find the lengths of the different regions </li>
                <li> To demonstrate which segments have macro-spines </li>
              </ul>
            </p>
        </div>
    )
  }
}

export default About;
