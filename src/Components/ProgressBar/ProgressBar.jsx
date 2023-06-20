import './ProgressBar.style.scss'

function ProgressBar({ totalQuestions, index }) {

  const styles = {
    width: `${ index === 0 ? 5 : index/totalQuestions * 100}%`,
    transition: 'all .3s linear',
  }

  return (
    <div className='content-progress-bar'>
      <div style={styles} className="status-progress"></div>
    </div>
  )
}

export default ProgressBar