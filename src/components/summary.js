import React from 'react';

const tickle = e => {
  e.preventDefault();
  alert('Hey! That tickles!');
};

const yearsProgramming = () => {
  const numbersInEnglish = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'twenty one',
    'twenty two',
    'twenty three',
    'twenty four',
    'twenty five'
  ];

  let numberOfyears = Math.floor(
    // January 2013 =~ 1357909260
    (Math.floor(Date.now() / 1000) - 1357909260) / 31536000
  );

  // Pretty sure that this code will get refactored before we hit 25 years..
  // but anyways...
  if (numberOfyears > 25) numberOfyears = 25;

  return numbersInEnglish[numberOfyears];
};

const Summary = () => (
  <div>
    <h2>Summary</h2>
    <p>
      <a rel="noreferrer" href="https://www.youtube.com/watch?v=ieVlCLhAsiY">
        Friendly
      </a>{' '}
      web developer residing in Victoria BC with over {yearsProgramming()} years
      of experience developing and building robust, high-volume commercial and
      government websites/apps; proficient in{' '}
      <a
        onClick={tickle}
        href="https://github.com/jonathanbell"
        rel="noreferrer"
      >
        JavaScript
      </a>{' '}
      (Node, ES6, React, Vanilla JS), PHP (Laravel, Drupal),{' '}
      <a
        href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fjonathanbell.github.io%2F"
        rel="noreferrer"
      >
        HTML
      </a>
      , relational and non-relational databases, CSS3 and Git source control
      systems.
      {/* It's a crazy amount of stuff we have to know and learn; and yet we all just agree to it. */}
    </p>
    <h3>Objective</h3>
    <p>
      {/* JavaScript developer */}
      Secure a position with a small to medium-sized (5-500 employees), local or
      remotely-based company as a web developer. The company should have a
      collaborative and welcoming culture as well as opportunities for potential
      long-term growth into full stack engineering positions.
    </p>
  </div>
);

export default Summary;
