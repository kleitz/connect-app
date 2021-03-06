import React, { PropTypes as PT } from 'react'
import { Icons } from 'appirio-tech-react-components'
import config from '../../../config/projectWizard'
import ProductCard from './ProductCard'
import SVGIconImage from '../../../components/SVGIconImage'
import './SelectProduct.scss'

const { ConnectLogo } = Icons

function SelectProduct(props) {
  const cards = []
  for (const key in config) {
    const type = config[key]
    const subTypes = type.subtypes
    for(const subType in subTypes) {
      const item = subTypes[subType]
      // don't render disabled items for selection
      if (item.disabled) continue
      const icon = <SVGIconImage filePath={item.icon} />
      cards.push(
        <ProductCard
          icon={icon}
          info={item.details}
          key={item.id}
          onClick={() => props.onProductChange(type.id, item.id)}
          type={ subType }
        />
      )
    }
  }
  return (
    <div>
      <div className="header headerSelectProduct">
        <ConnectLogo />
      </div>
      <div className="SelectProduct">
        <h1>Select your project type</h1>
        <div className="cards">{cards}</div>
        <div className="footer">
          Looking for something else? <a href="http://crowdsourcing.topcoder.com/piqued_by_crowdsourcing">Get in touch with us.</a>
        </div>
      </div>
    </div>
  )
}

SelectProduct.propTypes = {
  onProductChange: PT.func.isRequired
}

export default SelectProduct
