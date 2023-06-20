import './SpinnerLoader.style.scss';

function SpinnerLoader() {
  return (
    <div className="content-spinner-loader">
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default SpinnerLoader