import PropTypes from 'prop-types';
import { FilterLabel, FilterInput } from './ContactFilter.styled';

function ContactFilter({ filter, changeFilter }) {
  return (
    <div>
      <FilterLabel htmlFor="filter">Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
      />
    </div>
  );
}

export default ContactFilter;

ContactFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
