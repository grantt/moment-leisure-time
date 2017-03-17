'use strict'
import moment from '../index'
import chai from 'chai'

let expect = chai.expect


describe('Date', () => {
  describe('#holiday', () => {
    let date
    it('returns false for 02/01/2017', () => {
      date = moment('02/01/2017', 'MM/DD/YYYY')
      expect(date.holiday()).to.equal(false)
    })

    it('returns true for 12/25/2017', () => {
      date = moment('12/25/2017', 'MM/DD/YYYY')
      expect(date.holiday()).to.equal(true)
    })
  })
  describe('#businessDay', () => {
    let date
    it('returns false for Sunday 03/19/2017', () => {
      date = moment('03/19/2017', 'MM/DD/YYYY')
      expect(date.businessDay()).to.equal(false)
    })

    it('returns true for Thursday 03/16/2017', () => {
      date = moment('03/16/2017', 'MM/DD/YYYY')
      expect(date.businessDay()).to.equal(true)
    })
  })
  describe('#addBusinessDays', () => {
    let date
    let expectedDate
    it('returns Wednesday 03/22/2017 when 2 days are added to Monday 03/20/2017', () => {
      date = moment('03/20/2017', 'MM/DD/YYYY')
      expectedDate = moment('03/22/2017', 'MM/DD/YYYY').format()
      expect(date.addBusinessDays(2).format()).to.equal(expectedDate)
    })
    it('returns Monday 03/20/2017 when 2 days are added to Friday 03/17/2017', () => {
      date = moment('03/17/2017', 'MM/DD/YYYY')
      expectedDate = moment('03/20/2017', 'MM/DD/YYYY').format()
      expect(date.addBusinessDays(2).format()).to.equal(expectedDate)
    })
    it('returns Tuesday 12/26/2017 when 2 days are added to Friday 12/22/2017', () => {
      date = moment('12/22/2017', 'MM/DD/YYYY')
      expectedDate = moment('12/26/2017', 'MM/DD/YYYY').format()
      expect(date.addBusinessDays(2).format()).to.equal(expectedDate)
    })
  })
  describe('#subtractBusinessDays', () => {
    let date
    let expectedDate
    it('returns Monday 03/20/2017 when 2 days are subtracted from Wednesday 03/22/2017', () => {
      date = moment('03/22/2017', 'MM/DD/YYYY')
      expectedDate = moment('03/20/2017', 'MM/DD/YYYY').format()
      expect(date.subtractBusinessDays(2).format()).to.equal(expectedDate)
    })
    it('returns Friday 03/17/2017 when 2 days are subtracted from Monday 03/20/2017', () => {
      date = moment('03/20/2017', 'MM/DD/YYYY')
      expectedDate = moment('03/17/2017', 'MM/DD/YYYY').format()
      expect(date.subtractBusinessDays(2).format()).to.equal(expectedDate)
    })
    it('returns Friday 12/22/2017 when 2 days are subtracted from Tuesday 12/26/2017', () => {
      date = moment('12/26/2017', 'MM/DD/YYYY')
      expectedDate = moment('12/22/2017', 'MM/DD/YYYY').format()
      expect(date.subtractBusinessDays(2).format()).to.equal(expectedDate)
    })
  })
  describe('#customConfig', () => {
    let config
    let date
    beforeEach(() => {
      config = {
        businessDays: {
          en: [0],
        },
        holidays: {
          en: {
            '2017': {
              '0': [3],
              '11': []
            }
          }
        }
      }
    })

    it('loads a custom configuration', () => {
      expect(moment.loadConfig(config)).to.equal(config)
    })
    it('uses a custom configuration for holiday and returns true', () =>{
      date = moment('01/03/2017', 'MM/DD/YYYY')
      expect(date.holiday()).to.equal(true)
    })
    it('uses a custom configuration for holiday and returns false', () =>{
      date = moment('12/25/2017', 'MM/DD/YYYY')
      expect(date.holiday()).to.equal(false)
    })
    it('uses a custom configuration for businessDay and returns true for Sunday 03/19/2017', () =>{
      date = moment('03/19/2017', 'MM/DD/YYYY')
      expect(date.businessDay()).to.equal(true)
    })
    it('uses a custom configuration for businessDay and returns false for Saturday 03/18/2017', () =>{
      date = moment('03/18/2017', 'MM/DD/YYYY')
      expect(date.businessDay()).to.equal(false)
    })
  })
})