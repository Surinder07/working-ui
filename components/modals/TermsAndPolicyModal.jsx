import { terms, privacy, cookies, disclaimer, nda } from "../../constants";
import { Modal } from './base';
import { TermsAndPrivacyStyles } from '../../styles/elements';
import { useState, useEffect } from "react";

const TermsAndPolicyModal = (props) => {

    const [data, setData] = useState(terms);

    useEffect(() => {
        switch (props.data) {
            case 'terms':
                setData(terms);
                break;
            case 'privacy':
                setData(privacy);
                break;
            case 'cookies':
                setData(cookies);
                break;
            case 'disclaimer':
                setData(disclaimer);
                break;
            case 'nda':
                setData(nda);
                break;
        }
    }, [props.data])

    return (
        <Modal
            size='large'
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText='Close'
            showCloseButton
        >
            <h1>{data.title}</h1>
            {data.content.intro && <p>{data.content.intro}</p>}
            <ol className={TermsAndPrivacyStyles.orderedListNumbered}>
                {
                    data.content.pointers.map((list, i) => (
                        <li key={`li${i}`} className={TermsAndPrivacyStyles.subListNumbered}>
                            {list.title && <h2>{list.title}</h2>}
                            {list.data.intro && <p>{list.data.intro}</p>}
                            {
                                list.data.definitions &&
                                <table>
                                    <tbody>
                                        {
                                            list.data.definitions.map((def, i) => (
                                                <tr key={`tab${i}`}>
                                                    <td>{def.key}</td>
                                                    <td><p>{def.value}</p></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                            {
                                list.data.subPointers &&
                                (
                                    list.data.subPointers.filter(function (o) {
                                        return o.hasOwnProperty('title');
                                    }).length > 0 ?
                                        <ol className={TermsAndPrivacyStyles.orderedListNumbered}>
                                            {
                                                list.data.subPointers.map((sub, j) => (
                                                    <li key={`sub${i}_${j}`} className={TermsAndPrivacyStyles.subListNumbered}>
                                                        <p>{sub.title}</p>
                                                        {
                                                            sub.subPointers &&
                                                            <ol className={TermsAndPrivacyStyles.orderedListAlphabet}>
                                                                {
                                                                    sub.subPointers.map((sub2, i) => (
                                                                        <li key={`sub2_${i}`}>
                                                                            <p>{sub2}</p>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ol>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ol>
                                        :
                                        <ol className={props.data === 'terms' ? TermsAndPrivacyStyles.orderedListAlphabet : TermsAndPrivacyStyles.orderedListNumbered}>
                                            {
                                                list.data.subPointers.map((sub, j) => (
                                                    <li className={props.type !== 'terms' && TermsAndPrivacyStyles.subListNumbered} key={`sub${i}_${j}`} >
                                                        {
                                                            sub.intro ?
                                                                <>
                                                                    <p>{sub.intro}</p>
                                                                    {
                                                                        sub.subPointers ?
                                                                            <ol className={TermsAndPrivacyStyles.orderedListAlphabet}>
                                                                                {
                                                                                    sub.subPointers.map((sub2, k) => (
                                                                                        <li key={`sub2_${i}_${j}_${k}`}>
                                                                                            <p>{sub2}</p>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ol> :
                                                                            <p>{sub.description}</p>
                                                                    }
                                                                </>
                                                                :
                                                                <p>{sub}</p>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ol>
                                )
                            }
                            {list.data.conclusion && <p>{list.data.conclusion}</p>}
                        </li>
                    ))
                }
            </ol>
            {
                data.content.paragraphs &&
                data.content.paragraphs.map((para, i) => (
                    <>
                        <h2 style={{ width: '100%' }}>{para.title}</h2>
                        <p style={{ paddingLeft: '20px', width: '100%' }}>{para.description}</p>
                    </>
                ))
            }
        </Modal>
    )
}

export default TermsAndPolicyModal;