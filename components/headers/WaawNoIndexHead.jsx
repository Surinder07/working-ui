import WaawHead from './WaawHead';

/**
 * Create header for Html contatining title and all meta values
 * @param {*} title
 */
const WaawNoIndexHead = ({ title }) => {
    return (
        <WaawHead title={title} meta={{ robots: 'no-index, no-follow' }} />
    )
}

export default WaawNoIndexHead;