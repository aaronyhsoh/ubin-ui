import React from 'react';
import { distributeDividendStore } from "../../store/DistributeDividendStore";
import chinese_flag from '../../images/chinese_flag.png';
import english_flag_us from '../../images/english_flag_us.png';
import english_flag_uk from '../../images/english_flag_uk.png';
import spanish_flag from '../../images/spanish_flag.png';
import french_flag from '../../images/french_flag.png';
import thai_flag from '../../images/thai_flag.png';
import japanese_flag from '../../images/japanese_flag.png';
import {Dropdown} from "react-bootstrap";
import Menu from './Menu';
import Toggle from './Toggle';
import './LanguageSelector.css';
import {properties} from "../../utils/Properties";

// icons from https://www.iconfinder.com/iconsets/ensign-11

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: english_flag_uk,
      lang: distributeDividendStore.getLanguage(),
    }
    this.click = this.click.bind(this);
  }

  click() {
    console.log("Hello")
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle as={Toggle} id="dropdown-custom-components">
          <img className="language-flag"
            src={this.state.image}
          />
          {distributeDividendStore.language}

        </Dropdown.Toggle>
        <Dropdown.Menu as={Menu}>
          <Dropdown.Item eventKey="1"> FR <img className="language-flag" src={french_flag}/></Dropdown.Item>
          <Dropdown.Item eventKey="2"> ZH <img className="language-flag" src={chinese_flag}/></Dropdown.Item>
          <Dropdown.Item eventKey="3"> ES <img className="language-flag" src={spanish_flag}/></Dropdown.Item>
          <Dropdown.Item eventKey="1"> JP <img className="language-flag" src={japanese_flag}/> </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

  }
}

export default LanguageSelector;
