import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CBadge,
  CWidgetStatsF,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CChartLine } from '@coreui/react-chartjs'
import { cilSearch, cilUserPlus, cilTrash } from '@coreui/icons'
import { getStyle } from '@coreui/utils'
import { Link } from 'react-router-dom'

const DataPemilik = () => {
  const [StatusData, setStatusData] = useState('weekly')
  const [dataText, setDataText] = useState('Senin - Minggu')
  const [dataWeekly, setWeekly] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  })
  const [dataMonthly, setMonthly] = useState({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  })
  const [Income, setIncome] = useState({
    daily_income: 0,
    monthly_income: 0,
    yearly_income: 0,
    average_daily_sales: 0,
    average_monthly_sales: 0,
    average_yearly_sales: 0,
  })
  const [visible, setVisible] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    handleData()
    handleWeekly()
    handleMonthly()
  }, [])

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const handleData = () => {
    axios
      .get('http://localhost:8000/api/pemilik/income')
      .then((response) => {
        console.log(response.data)
        setIncome(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const handleWeekly = () => {
    axios
      .get('http://localhost:8000/api/pemilik/minggu')
      .then((response) => {
        console.log(response.data)
        setWeekly(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const handleMonthly = () => {
    axios
      .get('http://localhost:8000/api/pemilik/bulan')
      .then((response) => {
        console.log(response.data)
        setMonthly(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const handleButtonWeekly = () => {
    setStatusData('weekly')
    setDataText('Senin - Minggu')
  }

  const handleButtonMonthly = () => {
    setStatusData('monthly')
    setDataText('January - December ')
  }

  return (
    <div>
      <CRow className="g-3">
        <CCol xs={12} lg={4}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSearch} size="xl" />}
            padding={false}
            title="Jumlah Harian"
            value={Income.daily_income}
            color="primary"
          />
        </CCol>
        <CCol xs={12} lg={4}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSearch} size="xl" />}
            padding={false}
            title="Jumlah Bulanan"
            value={Income.monthly_income}
            color="info"
          />
        </CCol>
        <CCol xs={12} lg={4}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSearch} size="xl" />}
            padding={false}
            title="Jumlah Tahunan"
            value={Income.yearly_income}
            color="warning"
          />
        </CCol>
      </CRow>
      <CRow className="g-3">
        <CCol xs={12} lg={4}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSearch} size="xl" />}
            padding={false}
            title="Rata-Rata Harian"
            value={Income.average_daily_sales}
            color="primary"
          />
        </CCol>
        <CCol xs={12} lg={4}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSearch} size="xl" />}
            padding={false}
            title="Rata-Rata Bulanan"
            value={Income.average_monthly_sales}
            color="info"
          />
        </CCol>
        <CCol xs={12} lg={4}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon width={24} icon={cilSearch} size="xl" />}
            padding={false}
            title="Rata-Rata Tahunan"
            value={Income.average_yearly_sales}
            color="warning"
          />
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Penjualan
              </h4>
              <div className="small text-body-secondary">{dataText}</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                <CButton color="outline-secondary" className="mx-0" onClick={handleButtonWeekly}>
                  Weekly
                </CButton>
                <CButton color="outline-secondary" className="mx-0" onClick={handleButtonMonthly}>
                  Monthly
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          {StatusData === 'monthly' ? (
            <CChartLine
              ref={chartRef}
              style={{ height: '300px', marginTop: '40px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ],
                datasets: [
                  {
                    backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: [
                      dataMonthly.January,
                      dataMonthly.February,
                      dataMonthly.March,
                      dataMonthly.April,
                      dataMonthly.May,
                      dataMonthly.June,
                      dataMonthly.July,
                      dataMonthly.August,
                      dataMonthly.September,
                      dataMonthly.October,
                      dataMonthly.November,
                      dataMonthly.December,
                    ],
                    fill: true,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || ''
                        if (label) {
                          label += ': '
                        }
                        if (context.parsed.y !== null) {
                          label +=
                            'Rp. ' +
                            context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        return label
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                      drawOnChartArea: false,
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                  y: {
                    border: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      beginAtZero: true,
                      color: getStyle('--cui-body-color'),
                      max: 250,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      callback: function (value) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      },
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          ) : (
            <CChartLine
              ref={chartRef}
              style={{ height: '300px', marginTop: '40px' }}
              data={{
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [
                  {
                    backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: [
                      dataWeekly.Monday,
                      dataWeekly.Tuesday,
                      dataWeekly.Wednesday,
                      dataWeekly.Thursday,
                      dataWeekly.Friday,
                      dataWeekly.Saturday,
                      dataWeekly.Sunday,
                    ],
                    fill: true,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || ''
                        if (label) {
                          label += ': '
                        }
                        if (context.parsed.y !== null) {
                          label +=
                            'Rp. ' +
                            context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        return label
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                      drawOnChartArea: false,
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                  y: {
                    border: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      beginAtZero: true,
                      color: getStyle('--cui-body-color'),
                      max: 250,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      callback: function (value) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      },
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DataPemilik
