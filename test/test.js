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
  describe('#customConfig', () => {
    let config
    beforeEach(() => {
      // Create a new Rectangle object before every test.
      config = {
        businessDays: {
          en: [1,2,3,4,5],
        },
        holidays: {
          en: {
            '2017': {
              '0': [1],
              '11': []
            }
          }
        }
      }
    })

    it('loads a custom configuration', () => {
      expect(moment.loadConfig(config)).to.equal(config)
    })
  })
})