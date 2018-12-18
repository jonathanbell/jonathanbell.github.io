import React from 'react';

import ReferencesLayout from '../components/referencesLayout';

const ReferencesPage = ({ data }) => (
  <ReferencesLayout>
    <h2>References</h2>

    <h3>David Cusack</h3>
    <h4>
      User Experience Design: Information Architect, Ministry of Education,
      British Columbia Public Service
    </h4>
    <p>
      Phone: <a href="tel:+17786792382">(778) 679-2382</a>
      <br />
      Email: <a href="mailto:David.Cusack@gov.bc.ca">David.Cusack@gov.bc.ca</a>
    </p>

    <h3>Zita Teng</h3>
    <h4>
      Executive Director, Strategic Planning &amp; Executive Operations,
      Ministry of Education, British Columbia Public Service
    </h4>
    <p>
      Phone: <a href="tel:+17786794740">(778) 679-4740</a>
      <br />
      Email: <a href="mailto:zita.teng@gov.bc.ca">Zita.Teng@gov.bc.ca</a>
    </p>

    <h3>Trevor Paul</h3>
    <h4>
      Director, Corporate Communications Branch, Ministry of Education, British
      Columbia Public Service
    </h4>
    <p>
      Phone: <a href="tel:+12504155641">(250) 415-5641</a>
      <br />
      Email: <a href="mailto:Trevor.Paul@gov.bc.ca">Trevor.Paul@gov.bc.ca</a>
    </p>

    <h3>Saren Calvert</h3>
    <h4>
      Intermediate Programmer Analyst, Access, Audits and Agreements Branch,
      Ministry of Health, British Columbia Public Service
    </h4>
    <p>
      Phone: <a href="tel:+17786982079">(778) 698-2079</a>
      <br />
      Email:{' '}
      <a href="mailto:Saren.Calvert@gov.bc.ca">Saren.Calvert@gov.bc.ca</a>
    </p>

    <h3>Laura Hutchinson</h3>
    <h4>
      Director, Digital Delivery &amp; Integration, Ministry of Advanced
      Education, British Columbia Public Service
    </h4>
    <p>
      Phone: <a href="tel:+12505148724">(250) 514-8724</a>
      <br />
      Email:{' '}
      <a href="mailto:Laura.Hutchinson@gov.bc.ca">Laura.Hutchinson@gov.bc.ca</a>
    </p>
  </ReferencesLayout>
);

export default ReferencesPage;
