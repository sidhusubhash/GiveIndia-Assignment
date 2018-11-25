import React, { Component } from 'react';
import './App.css';
const colors = ['Black', 'White', 'Blue', 'Red']
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      newRegNo: '',
      newColor: '',
      isIntialCarDetailsValidated: true,
      isNewCarValidated: true,
      sortColor: '',
      sortRegNo:''
    }
  }
  onChange = (value, type) => {
    let { data } = this.state
    switch (type) {
      case 'no_of_parking_lots':
        let tempArray = []
        for (let i = 1; i <= value; i++) {
          tempArray.push({ id: i })
        }
        this.setState({ data: tempArray })
        break;
      case 'initial-car-details':
        if (value < data.length) {
          for (let j = 0; j < value; j++) {
            data[j].reg_no = "KA-" + `${Math.floor(Math.random() * 10)}` + `${Math.floor(Math.random() * 10)}-` + `${String.fromCharCode(Math.floor(Math.random() * 26) + 97).toLocaleUpperCase()}` + `${String.fromCharCode(Math.floor(Math.random() * 26) + 97).toLocaleUpperCase()}-` + `${Math.floor(Math.random() * 10000)}`
            data[j].color = colors[Math.floor(Math.random() * 4)]
          }
          this.setState({ data, isIntialCarDetailsValidated: true })
          break;
        }
        else {
          this.setState({ isIntialCarDetailsValidated: false })
          break
        }

      default:
        break;
    }
  }
  onClickRemove = (index) => {
    let { data } = this.state
    data[index].reg_no = ''
    data[index].color = ''
    this.setState({ data })
  }
  onAddNewCar = () => {
    let { data, newColor, newRegNo } = this.state
    if (newColor && newRegNo) {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].reg_no || !data[i].color) {
          data[i].reg_no = newRegNo
          data[i].color = newColor
          this.setState({ data })
          break
        }
      }
    }
  }
  validateInput = () => {
    let { newColor, newRegNo } = this.state
    if ((/^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$/.test(newRegNo)) && (newColor === 'Black' || newColor === 'White' || newColor === 'Red' || newColor === 'Blue')) {
      this.onAddNewCar()
      this.setState({ isNewCarValidated: true })
    }
    else {
      this.setState({ isNewCarValidated: false })
    }
  }

  render() {
    let { data, isNewCarValidated, isIntialCarDetailsValidated, sortColor, sortRegNo } = this.state
    return (
      <div className="App">
        <div className='input-area'>
          <p>Parking lots<span style={{ color: 'red' }}>*</span>:
            <input type="number" placeholder='No. of parking lots' onChange={(e) => this.onChange(e.target.value, 'no_of_parking_lots')} />
          </p>
          <p>Initial car details<span style={{ color: 'red' }}>*</span>:
            <input type="number" placeholder='No. initial car details' onChange={(e) => this.onChange(e.target.value, 'initial-car-details')} />
          </p>
          {!isIntialCarDetailsValidated && <p className='warning'>No. of initial car details cant be more than No. of parking lots</p>}
          Enter New Car
          <p>Registration No.:
            <input placeholder='KA-01-HH-9899' onChange={(e) => this.setState({ newRegNo: e.target.value })} />
          </p>
          <p>color:
            <input type="text" placeholder='colors' onChange={(e) => this.setState({ newColor: e.target.value })} />
            <p className='warning'>Please choose these colors - Black,Red,Blue,White</p>
          </p>
          <input type="submit" onClick={(e) => this.validateInput()} />
          {!isNewCarValidated && <p className='warning'>Invalid input!</p>}
          <p>Sort with color:
            <input type="text" placeholder='colors' onChange={(e) => this.setState({ sortColor: e.target.value })} />
          </p>
          {sortColor
            &&
            data.map((item, index) => {
              if (item.color === sortColor) {
                return (
                  <div key={index} className='single-parking-details-row' >
                    <div className='row-item1'>{item.id}</div>
                    <div className='row-item2'>{item.reg_no}</div>
                    <div className='row-item3'>{item.color}</div>
                  </div>
                )
              }
            })}
          <p>Sort with Reg No.:
            <input type="text" placeholder='colors' onChange={(e) => this.setState({ sortRegNo: e.target.value })} />
          </p>
          {sortRegNo
            &&
            data.map((item, index) => {
              if (item.reg_no === sortRegNo) {
                return (
                  <div key={index} className='single-parking-details-row' >
                    <div className='row-item1'>{item.id}</div>
                    <div className='row-item2'>{item.reg_no}</div>
                    <div className='row-item3'>{item.color}</div>
                  </div>
                )
              }
            })}
        </div>
        <div className='display-area'>
          <div className='display-parking-details'>
            <div className='single-parking-details-row'>
              <div className='row-item1'>Slot</div>
              <div className='row-item2'>Registration No.</div>
              <div className='row-item3'>color</div>
              <div className='row-item3'></div>
            </div>
            {data.map((item, index) => {
              return (
                <div key={index} className='single-parking-details-row' >
                  <div className='row-item1'>{item.id}</div>
                  <div className='row-item2'>{item.reg_no}</div>
                  <div className='row-item3'>{item.color}</div>
                  <div className='row-item3' onClick={() => this.onClickRemove(index)}>delete</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='display-area'>
          <div className='display-parking-lots'>
            {data.map((item, index) => {
              return (
                <div className='single-parking-lot' style={item.reg_no ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>
                  <p className='parging-lot-number-text'>{index + 1}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
