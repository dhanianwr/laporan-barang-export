import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Row, Col } from "reactstrap";
  
export default function CalendarGfg() {
    const [value, onChange] = useState(new Date());
  
    return (
        <Row>
            <Col xs="12">
              <div id='kalender'>
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>  
            </Col>
        </Row>
        
    );
}