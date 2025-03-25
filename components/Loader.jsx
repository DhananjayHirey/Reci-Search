import React from 'react'
import ContentLoader from 'react-content-loader'

function Loader(props) {
  return (
    <div>
      <ContentLoader
      speed={2}
    width={700}
    height={80}
    viewBox="0 0 840 84"
    backgroundColor="#7664c4"
    foregroundColor="#ecebeb"
    {...props}
      >
        <rect x="0" y="0" rx="3" ry="3" width="700" height="16" /> 
        <rect x="0" y="0" rx="3" ry="3" width="700" height="16" /> 
        <rect x="0" y="0" rx="3" ry="3" width="700" height="16" /> 
        <rect x="0" y="0" rx="3" ry="3" width="700" height="16" /> 
      </ContentLoader>
    </div>
  )
}

export default Loader


// Loader.metadata = {
//   name: 'Ahsan Ullah', // My name
//   github: 'IamAhsanMani', // Github username
//   description: 'Upwork Job',
//   filename: 'UpworkJobLoader',
// }

// export default Loader;