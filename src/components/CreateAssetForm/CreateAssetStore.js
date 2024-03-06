import * as api from '../../utils/Api';
import {userStore} from '../../store/UserStore';
import {decorate, observable} from "mobx";

class CreateAssetStore {

  typeOfUniqueIdentifier = [
    {value: 'ISIN', label: 'ISIN'},
    //{value: 'LEI', label: 'LEI'},
    {value: 'CUSIP', label: 'CUSIP'},
    {value: 'Others', label: 'Others'}
  ];

  defaultCurrencies = [
    {value: 'USD', label: 'USD',},
    {value: 'EUR', label: 'EUR',},
    {value: 'CAD', label: 'CAD',},
    {value: 'JPY', label: 'JPY',},
    {value: 'SGD', label: 'SGD'},
    {value: 'NOK', label: 'NOK'},
    {value: 'GBP', label: 'GBP'},
    {value: 'SEK', label: 'SEK'},
    {value: 'CHF', label: 'CHF'},
    {value: 'NZD', label: 'NZD'},
    {value: 'AUD', label: 'AUD'},
  ];

  investorType = [
    'Retail',
    'Accredited',
    'Institutional'
  ];

  nationalities = [
    'ABKHAZIAN',
    'AFGHANI',
    'ALANDIC',
    'ALBANIAN',
    'ALGERIAN',
    'AMERICAN',
    'ANDORRAN',
    'ANGOLAN',
    'ANTARCTIC',
    'ANTIGUAN',
    'ARGENTINE',
    'ARMENIAN',
    'ARUBIAN',
    'ASCENSION',
    'AUSTRALIAN ANTARCTIC TERRITORY',
    'AUSTRALIAN EXTERNAL TERRITORY',
    'AUSTRALIAN',
    'AUSTRIAN',
    'AZERBAIJANI',
    'BAHAMEESE',
    'BAHRAINIAN',
    'BAKER ISLAND',
    'BANGLADESHI',
    'BARBADIAN',
    'BELARUSIAN',
    'BELGIAN',
    'BELIZEAN',
    'BENINESE',
    'BHUTANESE',
    'BOLIVIAN',
    'BOSNIAN',
    'BOUVET ISLAND',
    'BRAZILIAN',
    'BRITISH ANTARCTIC TERRITORY',
    'BRITISH INDIAN OCEAN TERRITORY',
    'BRITISH OVERSEAS TERRITORY',
    'BRITISH SOVEREIGN BASE AREAS',
    'BRITISH',
    'BRUNEIAN',
    'BULGARIAN',
    'BURKINABE',
    'BURUNDIAN',
    'CAMBODIAN',
    'CAMEROONIAN',
    'CANADIAN',
    'CAPE VERDEAN',
    'CARIBBEAN NETHERLANDS',
    'CENTRAL AFRICAN',
    'CHADIAN',
    'CHILEAN',
    'CHINESE',
    'CLIPPERTON ISLAND',
    'COLOMBIAN',
    'COMORAN',
    'CONGOLESE',
    'COOK ISLANDER',
    'COSTA RICAN',
    'CROATIAN',
    'CUBAN',
    'CURACAOAN',
    'CYPRIOT',
    'CZECH',
    'DANISH',
    'DJIBOUTIAN',
    'DOMINICAN',
    'DUTCH',
    'ECUADOREAN',
    'EGYPTIAN',
    'EMIRIAN',
    'EQUATORIAL GUINEAN',
    'ERITREAN',
    'ESTONIAN',
    'ETHIOPIAN',
    'FAROESE',
    'FIJIAN',
    'FILIPINO',
    'FINNISH',
    'FRENCH GUIANESE',
    'FRENCH OVERSEAS COLLECTIVITY',
    'FRENCH OVERSEAS REGION',
    'FRENCH SOUTHERN AND ANTARCTIC LANDS',
    'FRENCH SOUTHERN TERRITORIES',
    'FRENCH',
    'GABONESE',
    'GAMBIAN',
    'GEORGIAN',
    'GERMAN',
    'GHANAIAN',
    'GIBRALTARIAN',
    'GREEK',
    'GREENLANDER',
    'GRENADIAN',
    'GUADELOUPEAN',
    'GUAMANIAN',
    'GUATEMALAN',
    'GUERNSEY',
    'GUINEAN',
    'GUYANESE',
    'HAITIAN',
    'HONDURAN',
    'HONG KONG',
    'HOWLAND ISLAND',
    'HUNGARIAN',
    'ICELANDER',
    'I-KIRIBATI',
    'INDIAN',
    'INDONESIAN',
    'IRANIAN',
    'IRAQI',
    'IRISH',
    'ISRAELI',
    'ITALIAN',
    'IVORIAN',
    'JAMAICAN',
    'JAPANESE',
    'JARVIS ISLAND',
    'JERSEY',
    'JOHNSTON ATOLL',
    'JORDANIAN',
    'KAZAKHSTANI',
    'KENYAN',
    'KINGMAN REEF',
    'KITTIAN',
    'KOSOVAR',
    'KUWAITI',
    'KYRGYZSTANI',
    'LAOTIAN',
    'LATVIAN',
    'LEBANESE',
    'LIBERIAN',
    'LIBYAN',
    'LIECHTENSTEINER',
    'LITHUNIAN',
    'LUXEMBOURGER',
    'MACANESE',
    'MACEDONIAN',
    'MAHORAN',
    'MALAGASY',
    'MALAWIAN',
    'MALAYSIAN',
    'MALDIVAN',
    'MALIAN',
    'MALTESE',
    'MANX',
    'MARSHALLESE',
    'MARTINICAN',
    'MAURITANIAN',
    'MAURITIAN',
    'MEXICAN',
    'MICRONESIAN',
    'MOLDOVAN',
    'MONACAN',
    'MONGOLIAN',
    'MONTENEGRIN',
    'MONTSERRATIAN',
    'MOROCCAN',
    'MOSOTHO',
    'MOTSWANA',
    'MOZAMBICAN',
    'MYANMAR',
    'NAGORNO-KARABAKH',
    'NAMIBIAN',
    'NAURUAN',
    'NAVASSA ISLAND',
    'NEPALESE',
    'NEW CALEDONIAN',
    'NEW ZEALANDER',
    'NICARAGUAN',
    'NIGERIAN',
    'NIGERIEN',
    'NIUEAN',
    'NI-VANUATU',
    'NORFOLK ISLANDER',
    'NORTH KOREAN',
    'NORWEGIAN',
    'OMANI',
    'PAKISTANI',
    'PALAUAN',
    'PALESTINIAN',
    'PALMYRA ATOLL',
    'PANAMANIAN',
    'PAPUA NEW GUINEAN',
    'PARAGUAYAN',
    'PERUVIAN',
    'PETER I ISLAND',
    'PITCAIRN ISLANDER',
    'POLISH',
    'PORTUGUESE',
    'PRIDNESTROVIE (TRANSNISTRIA)',
    'PUERTO RICAN',
    'QATARI',
    'QUEEN MAUD LAND',
    'ROMANIAN',
    'ROSS DEPENDENCY',
    'RUSSIAN',
    'RWANDAN',
    'SAINT LUCIAN',
    'SAINT VINCENTIAN',
    'SAINT-PIERRAIS',
    'SALVADOREAN',
    'SAMOAN',
    'SANMARINESE',
    'SAO TOMEAN',
    'SAUDI ARABIAN',
    'SENEGALESE',
    'SERBIAN',
    'SEYCHELLOIS',
    'SIERRA LEONEAN',
    'SINGAPOREAN',
    'SLOVAKIAN',
    'SLOVENIAN',
    'SOLOMON ISLANDER',
    'SOMALI',
    'SOMALILAND',
    'SOUTH AFRICAN',
    'SOUTH KOREAN',
    'SOUTH OSSETIA',
    'SOUTH SUDANESE',
    'SPANISH',
    'SRI LANKAN',
    'SUDANESE',
    'SURINAMER',
    'SVALBARD AND JAN MAYEN ISLANDS',
    'SWAZI',
    'SWEDISH',
    'SWISS',
    'SYRIAN',
    'TAIWANESE',
    'TAJIKISTANI',
    'TANZANIAN',
    'THAI',
    'TIMORESE',
    'TOGOLESE',
    'TOKELAUAN',
    'TONGAN',
    'TRINIDADIAN',
    'TRISTAN DA CUNHA',
    'TUNISIAN',
    'TURKISH',
    'TURKMEN',
    'TUVALUAN',
    'U.S. TERRITORY',
    'UGANDAN',
    'UKRAINIAN',
    'URUGUAYAN',
    'UZBEKISTANI',
    'VATICAN',
    'VENEZUELAN',
    'VIETNAMESE',
    'WAKE ISLAND',
    'WESTERN SAHARAN',
    'YEMENI',
    'ZAMBIAN',
    'ZIMBABWEAN',
    'UNKNOWN'
  ];

  residences = [
    'ABKHAZIA',
      'AFGHANISTAN',
      'ALAND ISLANDS',
      'ALBANIA',
      'ALGERIA',
      'AMERICAN SAMOA',
      'ANDORRA',
      'ANGOLA',
      'ANGUILLA',
      'ANTARCTICA',
      'ANTIGUA AND BARBUDA',
      'ARGENTINA',
      'ARMENIA',
      'ARUBA',
      'ASCENSION',
      'ASHMORE AND CARTIER ISLANDS',
      'AUSTRALIA',
      'AUSTRALIAN ANTARCTIC TERRITORY',
      'AUSTRIA',
      'AZERBAIJAN',
      'BAHAMAS',
      'BAHRAIN',
      'BAKER ISLAND',
      'BANGLADESH',
      'BARBADOS',
      'BELARUS',
      'BELGIUM',
      'BELIZE',
      'BENIN',
      'BERMUDA',
      'BHUTAN',
      'BOLIVIA',
      'BOSNIA AND HERZEGOVINA',
      'BOTSWANA',
      'BOUVET ISLAND',
      'BRAZIL',
      'BRITISH ANTARCTIC TERRITORY',
      'BRITISH INDIAN OCEAN TERRITORY',
      'BRITISH SOVEREIGN BASE AREAS',
      'BRITISH VIRGIN ISLANDS',
      'BRUNEI',
      'BULGARIA',
      'BURKINA FASO',
      'BURMA (REPUBLIC OF THE UNION OF MYANMAR)',
    'BURUNDI',
    'CAMBODIA',
    'CAMEROON',
    'CANADA',
    'CAPE VERDE',
    'CARIBBEAN NETHERLANDS',
    'CAYMAN ISLANDS',
    'CENTRAL AFRICAN REPUBLIC',
    'CHAD',
    'CHILE',
    'CHINA',
    'CHRISTMAS ISLAND',
    'CLIPPERTON ISLAND',
    'COCOS (KEELING) ISLANDS',
    'COLOMBIA',
    'COMOROS',
    'CONGO (REPUBLIC OF)',
    'COOK ISLANDS',
    'CORAL SEA ISLANDS',
    'COSTA RICA',
    'COTE D\'IVOIRE (IVORY COAST)',
    'CROATIA',
    'CUBA',
    'CURACAO',
    'CYPRUS',
    'CZECH REPUBLIC',
    'DEMOCRATIC REPUBLIC OF THE CONGO',
    'DENMARK',
    'DJIBOUTI',
    'DOMINICA',
    'DOMINICAN REPUBLIC',
    'ECUADOR',
    'EGYPT',
    'EL SALVADOR',
    'EQUATORIAL GUINEA',
    'ERITREA',
    'ESTONIA',
    'ETHIOPIA',
    'FALKLAND ISLANDS',
    'FAROE ISLANDS',
    'FIJI',
    'FINLAND',
    'FRANCE',
    'FRENCH GUIANA',
    'FRENCH POLYNESIA',
    'FRENCH SOUTHERN AND ANTARCTIC LANDS',
    'FRENCH SOUTHERN TERRITORIES',
    'GABON',
    'GAMBIA',
    'GEORGIA',
    'GERMANY',
    'GHANA',
    'GIBRALTAR',
    'GREECE',
    'GREENLAND',
    'GRENADA',
    'GUADELOUPE',
    'GUAM',
    'GUATEMALA',
    'GUERNSEY',
    'GUINEA',
    'GUINEA-BISSAU',
    'GUYANA',
    'HAITI',
    'HEARD AND MCDONALD ISLANDS',
    'HONDURAS',
    'HONG KONG',
    'HOWLAND ISLAND',
    'HUNGARY',
    'ICELAND',
    'INDIA',
    'INDONESIA',
    'IRAN',
    'IRAQ',
    'IRELAND',
    'ISLE OF MAN',
    'ISRAEL',
    'ITALY',
    'JAMAICA',
    'JAPAN',
    'JARVIS ISLAND',
    'JERSEY',
    'JOHNSTON ATOLL',
    'JORDAN',
    'KAZAKHSTAN',
    'KENYA',
    'KINGMAN REEF',
    'KIRIBATI',
    'KOSOVO',
    'KUWAIT',
    'KYRGYZSTAN',
    'LAOS',
    'LATVIA',
    'LEBANON',
    'LESOTHO',
    'LIBERIA',
    'LIBYA',
    'LIECHTENSTEIN',
    'LITHUANIA',
    'LUXEMBOURG',
    'MACAU',
    'MACEDONIA',
    'MADAGASCAR',
    'MALAWI',
    'MALAYSIA',
    'MALDIVES',
    'MALI',
    'MALTA',
    'MARSHALL ISLANDS',
    'MARTINIQUE',
    'MAURITANIA',
    'MAURITIUS',
    'MAYOTTE',
    'MEXICO',
    'MICRONESIA',
    'MIDWAY ISLANDS',
    'MOLDOVA',
    'MONACO',
    'MONGOLIA',
    'MONTENEGRO',
    'MONTSERRAT',
    'MOROCCO',
    'MOZAMBIQUE',
    'NAGORNO-KARABAKH',
    'NAMIBIA',
    'NAURU',
    'NAVASSA ISLAND',
    'NEPAL',
    'NETHERLANDS',
    'NEW CALEDONIA',
    'NEW ZEALAND',
    'NICARAGUA',
    'NIGER',
    'NIGERIA',
    'NIUE',
    'NORFOLK ISLAND',
    'NORTH KOREA',
    'NORTHERN CYPRUS',
    'NORTHERN MARIANA ISLANDS',
    'NORWAY',
    'OMAN',
    'PAKISTAN',
    'PALAU',
    'PALESTINE',
    'PALMYRA ATOLL',
    'PANAMA',
    'PAPUA NEW GUINEA',
    'PARAGUAY',
    'PERU',
    'PETER I ISLAND',
    'PHILIPPINES',
    'PITCAIRN ISLANDS',
    'PITCAIRN',
    'POLAND',
    'PORTUGAL',
    'PRIDNESTROVIE (TRANSNISTRIA)',
    'PUERTO RICO',
    'QATAR',
    'QUEEN MAUD LAND',
    'REUNION',
    'ROMANIA',
    'ROSS DEPENDENCY',
    'RUSSIAN FEDERATION',
    'RWANDA',
    'SAINT BARTHELEMY',
    'SAINT HELENA',
    'SAINT KITTS AND NEVIS',
    'SAINT LUCIA',
    'SAINT MARTIN (FRANCE)',
    'SAINT MARTIN (NETHERLANDS)',
    'SAINT PIERRE AND MIQUELON',
    'SAINT VINCENT AND GRENADINES',
    'SAMOA',
    'SAN MARINO',
    'SAO TOME AND PRINCIPE',
    'SAUDI ARABIA',
    'SENEGAL',
    'SERBIA',
    'SEYCHELLES',
    'SIERRA LEONE',
    'SINGAPORE',
    'SLOVAKIA',
    'SLOVENIA',
    'SOLOMON ISLANDS',
    'SOMALIA',
    'SOMALILAND',
    'SOUTH AFRICA',
    'SOUTH GEORGIA & SOUTH SANDWICH ISLANDS',
    'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
    'SOUTH KOREA',
    'SOUTH OSSETIA',
    'SOUTH SUDAN',
    'SPAIN',
    'SRI LANKA',
    'SUDAN',
    'SURINAME',
    'SVALBARD AND JAN MAYEN ISLANDS',
    'SWAZILAND',
    'SWEDEN',
    'SWITZERLAND',
    'SYRIA',
    'TAIWAN',
    'TAJIKISTAN',
    'TANZANIA',
    'THAILAND',
    'TIMOR-LESTE',
    'TOGO',
    'TOKELAU',
    'TONGA',
    'TRINIDAD AND TOBAGO',
    'TRISTAN DA CUNHA',
    'TUNISIA',
    'TURKEY',
    'TURKMENISTAN',
    'TURKS AND CAICOS ISLANDS',
    'TUVALU',
    'UGANDA',
    'UKRAINE',
    'UNITED ARAB EMIRATES',
    'UNITED KINGDOM',
    'UNITED STATES MINOR OUTLYING ISLANDS',
    'UNITED STATES OF AMERICA',
    'UNITED STATES VIRGIN ISLANDS',
    'URUGUAY',
    'UZBEKISTAN',
    'VANUATU',
    'VATICAN',
    'VENEZUELA',
    'VIETNAM',
    'WAKE ISLAND',
    'WALLIS AND FUTUNA ISLANDS',
    'WESTERN SAHARAN',
    'YEMEN',
    'ZAMBIA',
    'ZIMBABWE',
  'UNKNOWN'

];

  typesOfInvestors = [
    {value: 'Retail', label: 'Retail' },
    {value: 'Accredited', label: 'Accredited'},
    {value: 'Corporate', label: 'Institutional'}
  ];

  frequencyUnit = [

    {value: 'days', label: 'daily'},
    {value: 'weeks', label: 'weekly'},
    {value: 'months', label: 'monthly'},
    {value: 'quarters', label: 'quarterly'},
    {value: 'semi-annual', label: 'semi-annually'},
    {value: 'annual', label: 'annually'}

  ];

  // Step 1 info
formData = {
    currentStep: 'step1',
    step1: {
      securityName: {label: 'Stablecoin Pool', inputType: 'text', value: ''},
      //securityClass: {label: 'Security Class', inputType: 'text', value: ''},
      tickerCode: {label: 'Stablecoin ID', inputType: 'text', value: ''},
      currency: {label: 'Currency', inputType: 'dropdown', value: 'SGD', availableValues: this.defaultCurrencies},
      totalCirculatingAmount: {label: 'Amount', inputType: 'number', value: ''}
      //issuerName: {label: 'Issuer Name', inputType: 'text', value: ''},
      //issuanceAuthority: {label: 'Issuance Authority', inputType: 'text', value: ''}
    },

    // Step 2 info
    // step2: {
    //   // issuingAddress: {label: 'Issuing Address', inputType: 'text', value: ''},
    //   totalCirculatingAmount: {label: 'Issue Size', inputType: 'number', value: ''},
    //   //reservedAmount: {label: 'Reserved Amount', inputType: 'number', value: '0'},
    //   //tokensPerLot: {label: 'Tokens Per Lot', inputType: '', value: "1"},
    //   paymentCurrency: {label: 'Currency', value: 'USD', availableValues: this.defaultCurrencies},
    //   //issuancePrice: {label: 'Issuance Price', inputType: 'multifieldSelect', value: '', secondaryInput: 'paymentCurrency'},
    //  issuancePrice: {label: 'Issuance Price (USD)', inputType: 'number', value: ''},
    //   faceValue: {label: 'Face Value (USD)', inputType: 'number', value: ''},
    //   couponFrequency: {label: 'Coupon Periods', inputType: 'multifieldSelect', value: '', secondaryInput: 'frequencyUnit'},
    //   frequencyUnit: {label: 'Frequency', value: 'days', availableValues: this.frequencyUnit},
    //   subscribeStartDate: {label: 'Subscription Start Date', inputType: 'date', value: new Date().toISOString()},
    //   subscribeEndDate: {label: 'Subscription End Date', inputType: 'date', value: this.initDates(new Date(),1, 'weeks')},
    //   issueDate: {label: 'Issue Date', inputType: 'date', value: this.initDates(new Date(), 8, 'days')},
    //   nextCouponDate: {label: 'Next Coupon Date', inputType: 'date', value: this.initDates(new Date(),1, 'annual')},
    //   maturityDate: {label: 'Maturity Date', inputType: 'date', value: this.initDates(new Date(),2, 'annual')},
    //   minPurchaseAmount: {label: 'Min Purchase Amount', inputType: 'number', value: ''},
    //   maxPurchaseAmount: {label: 'Max Purchase Amount', inputType: 'number', value: ''},
    //   //lockupDays: {label: 'Lockup', inputType: 'number', value: ''},
    //   //disbursementCurrency: {label: 'Disbursement Currency', inputType: 'dropdown', value: 'SGD', availableValues: this.defaultCurrencies},
    //   annualisedInterestRate: {label: 'Annual Coupon Rate (% p.a.)', inputType: 'text', value: ''}
    // },

    // // Step 3 info
    // step3: {
    //   //exchange: {label: 'Exchange', inputType: 'text', value: ''},
    //   //leadUnderwriter: {label: 'Lead Underwriter', inputType: 'text', value: ''},
    //   permittedOrProhibited: {label: 'Permitted', inputType: 'selector', value: 'permitted'},
    //   nationalities: {label: 'Nationalities', inputType: '', value: [], availableValues: this.nationalities},
    //   residences: {label: 'Residences', inputType: '', value: [], availableValues: this.residences},
    //   investorType: {label: 'InvestorType', inputType: '', value: [], availableValues: this.investorType},
    //   investorsClearedFrom: {label: 'KYC cleared by', inputType: 'text', value: 'Bank'}
    // }
  }

  generateInfo() {
    var info = {};
    let formData = this.formData;


    for (var i in formData.step1) {
      if(formData.step1.hasOwnProperty(i)) {
        if(i.toString() === 'uniqueIdentifier') {
            info[i.toString()] = formData.step1.uniqueIdentifierCode.value.concat('-' + formData.step1.uniqueIdentifier.value);
            continue;
        }
        if(i.toString() === 'uniqueIdentifierCode') {
            continue;
        }
        info[i.toString()] = formData.step1[i.toString()].value;
      }
    }
    // for (var i in formData.step2) {
    //   if(formData.step2.hasOwnProperty(i)) {
    //     if (i.toString() === 'couponFrequency') {
    //       info[i.toString()] = formData.step2.couponFrequency.value.concat(' ' + formData.step2.frequencyUnit.value);
    //       continue;
    //     }
    //     if (i.toString() === 'frequencyUnit') {
    //       continue;
    //     }
    //     info[i.toString()] = formData.step2[i.toString()].value;
    //   }
    // }
    // for (var i in formData.step3) {
    //   if(formData.step3.hasOwnProperty(i)) {
    //     if ((i.toString() === 'residences') || (i.toString() === 'nationalities') || (i.toString() === 'investorType')) {
    //       let temp = formData.step3[i.toString()].value;
    //       let arrayString = '';
    //       temp.forEach(function (item) {

    //         arrayString = arrayString.concat(item + ",");
    //       })
    //       info[i.toString()] = arrayString.substring(0,arrayString.length-1);
    //       continue;
    //     } /*
    //     else if((i.toString() === 'investorType')) {
    //         let temp = formData.step3[i.toString()].values;
    //         let arrayString ='';
    //         temp.forEach(function (item) {
    //             arrayString = arrayString.concat(temp)
    //         })
    //         info[i.toString()] = arrayString;
    //         continue;
    //     } */
    //     info[i.toString()] = formData.step3[i.toString()].value;
    //   }
    // }

    info.issuerId = userStore.username;
    // info.currency = "USD";
    // info.reservedAmount = "0";
    // info.lockupDays = "1";
    // info.classOfSecurity = "BONDS";
    // info.blockchainType = "stacs";
    // info.reservedAmount = "0";

    return info;

  }

  initDates(date, value, unit) {
    //var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var newDate;

    switch(unit) {
      case 'annual': newDate = new Date(year + value, month, day); break;
      case 'months': newDate =  new Date(year, month + value, day); break;
      case 'weeks' : newDate = new Date(year, month, day + (value * 7)); break;
      case 'quarters' : newDate = new Date(year, month + (3 * value), day); break;
      case 'semi-annual' : newDate = new Date(year, month + (6 * value), day); break;
      case 'days': newDate =  new Date(year, month, day + value); break;
      default: newDate = date; break;
    }

    console.log(newDate.toISOString())

    return newDate.toISOString();
  }

  submitData() {
    const info = this.generateInfo();

    api.createAsset(info)
      .then(data => { console.log(data); })
      .catch(error => { console.log(error); })

  }

}

export const createAssetStore = new CreateAssetStore();
decorate(CreateAssetStore, {
  formData: observable
})
