var arrangeDescriptions = require('../routes/appDatabase/arrangeDescriptions.js');
var expect = require('chai').expect;

testRoutine = [
    [
      {
        sampleKey: 'sample value',
        anotherKey: null
      },
    { 
        sampleKey: 'sample value', 
        anotherSample: 'a sample' }
    ],
    [
      {
        test: 'value',
        key: 'test'
      }
    ],
    [
      { aTitle: 'test' },
      { bTitle: 'test' }
    ],
    [
      { cTitle: 'test' },
      { dTitle: 'test' }
    ]
  ];

var realRoutine = [
    [
      {
        title: 'Active Cycle of Breathing',
        subtitle: null
      },
      { title: 'PEP Devices', subtitle: 'pariPEP' }
    ],
    [
      {
        duration: '<10 minutes',
        frequency: 'Once per day'
      }
    ],
    [
      { adjunctTitle: 'Bronchodilators' },
      { adjunctTitle: 'Non-Invasive Ventilation' }
    ],
    [
      { adjunctTime: 'Before Airway Clearance' },
      { adjunctTime: 'After Airway Clearance' }
    ]
  ]



describe('#arrangeDescriptions()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await arrangeDescriptions()).to.be.false
      })
    })
  
    context('with non-object', function() {
        it('should return false', async function() {
            expect(await arrangeDescriptions('string')).to.be.false
          })
    })
  
    context('with empty object', function() {
        it('should return false', async function() {
            expect(await arrangeDescriptions({})).to.be.false
          })
    })
    
  
    context('with array of sample objects', function() {
      it('should return object', async function() {
          expect(await arrangeDescriptions(testRoutine)).to.be.an('object')
      })
    })

    context('with array of real objects', function() {
        it('should return object', async function() {
            expect(await arrangeDescriptions(testRoutine)).to.be.an('object')
        })
      })
    
  })