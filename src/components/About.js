import React, { Component } from 'react';
import trilo from '../trilo.jpg';

class About extends Component {
  render(){

    var h1 = {
      fontSize: 40,
      margin: 30,
      color: '#59abcf',
      textAlign: 'center',
    }

    var p1 = {
      fontSize: 16,
      padding: 90,
      textAlign: 'center',
      background: '#aaa',
      margin: 80
    }

    return(
        <div>
          <h1 style = {h1}>About Trilobite Bits</h1>

          <img src={trilo} width="350" height="230" className="trilo-img" alt="Trilobite" />

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
            <h2 >Findings</h2>
        </div>
    )
  }
}

export default About;
