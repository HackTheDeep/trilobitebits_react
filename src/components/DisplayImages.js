import React, { Component } from 'react'
import { 
  Panel,
  Grid,
  Row,
  Col,
} from 'react-bootstrap'

// Canvas for processing of image
import Canvas from './Canvas'

class DisplayImages extends Component {
  render() {
    // Styles for the Display Images class
    const panel = {
      width: '25rem',
      marginTop: '3rem',
    }

    // TODO
    // Use components to present images in cards

    console.log(this.props.originalImg, this.props.lines)
    return (
      <Grid>
        <Row>
          <Col xs={12} md={3}>
            <Panel bsStyle="success" style={panel}>
              <Panel.Heading>
                <Panel.Title componentClass="h3" className="text-center">Original</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <img src={this.props.originalImg} alt="Original image" />
              </Panel.Body>
            </Panel>
          </Col>

          <Col xs={12} md={3}>
            <Panel bsStyle="info" style={panel}>
              <Panel.Heading>
                <Panel.Title componentClass="h3" className="text-center">Proccessed</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Canvas image={this.props.originalImg} lines={this.props.lines} />
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DisplayImages
