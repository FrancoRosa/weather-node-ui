const Label = ({heading, variable, symbol, setModal, measurement}) => {
  return (
    <div class="level-item has-text-centered">
      <div onClick={() => setModal(variable) }>
        <p class="heading">{heading}</p>
        <p class="title">{measurement[variable] +' '+ symbol}</p>
      </div>
    </div>
  )
}

export default Label