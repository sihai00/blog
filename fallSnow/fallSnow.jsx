class Application extends React.Component {
  random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  position(){
    return this.random(1, 100)
  }
  delay(){
    return this.random(1, 4)
  }
  duration(){
    return this.random(4, 8)
  }
  name(){
    return this.random(1, 4)
  }
  timing(){
    return ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'][this.random(0, 4)]
  }
  render() {
    return (
      <div className='page'>
        {
          Array(10).fill().map((v, i) => (
            <span
              key={i}
              className='animation span'
              data-animation-position={this.position()}
              data-animation-delay={this.delay()}
              data-animation-timing={this.timing()}
              data-animation-duration={this.duration()}
              data-animation-name={this.name()}
            >{i}</span>
          ))
        }
      </div>
    )
  }
}

React.render(<Application />, document.getElementById('app'));