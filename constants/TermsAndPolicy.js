const data = process.env.termsAndPrivacyData;

export const terms = {
    title: `TERMS AND CONDITIONS`,
    content: {
        intro: `These Terms and Conditions, together with any and all other documents referred to herein, set out the terms of use under which you may use this website, ${data.deployedAddress} (“Our Site”). Please read these Terms and Conditions carefully and ensure that you understand them. Your agreement to comply with and be bound by these Terms and Conditions is deemed to occur upon your first use of Our Site. If you do not agree to comply with and be bound by these Terms and Conditions, you must stop using Our Site immediately.`,
        pointers: [
            {
                title: `Definitions and Interpretation`,
                data: {
                    intro: `In these Terms and Conditions, unless the context otherwise requires, the following expressions have the following meanings:`,
                    definitions: [
                        {
                            key: `“Account”`,
                            value: `Means an account required for a User to access certain areas of Our Site.`
                        },
                        {
                            key: `“Content”`,
                            value: `Means any and all text, images, audio, video, scripts, code, software, databases and any other form of information capable of being stored on a computer that appears on, or forms part of, Our Site.`
                        },
                        {
                            key: `“Our Site”`,
                            value: `Means this website, (${data.deployedAddress}) and a reference to “Our Site” includes reference to any and all Content included therein (including User Content, unless expressly stated otherwise).`
                        },
                        {
                            key: `“User”`,
                            value: `means a user of Our Site.`
                        },
                        {
                            key: `“User Content”`,
                            value: `Means cause profiles and associated pages, fundraising pages and associated pages, donor messages submitted by Users to Our Site.`
                        },
                        {
                            key: `“We/Us/Our”`,
                            value: `Means Waaw Global Inc., a company registered in Canada, whose registered address is ${data.businessAddress}.`
                        }
                    ]
                }
            },
            {
                title: `Access To Our Site`,
                data: {
                    subPointers: [
                        `Access to Our Site is free of charge.`,
                        `It is your responsibility to make any and all arrangements necessary in order to access Our Site.`,
                        `Access to Our Site is provided “as is” and on an “as available” basis. We may alter, suspend or discontinue Our Site (or any part of it) at any time and without notice. We will not be liable to you in any way if Our Site (or any part of it) is unavailable at any time and for any period.`
                    ]
                }
            },
            {
                title: `Accounts`,
                data: {
                    subPointers: [
                        `Certain parts of Our Site (including the ability to submit User Content) may require an Account in order to access them.`,
                        `You may not create an Account if you are under ${data.minAge} years of age. If you are under ${data.minAge} years of age and wish to use the parts of Our Site that require an Account, your parent or guardian should create the Account for you and you must only use the Account with their supervision.`,
                        `When creating an Account, the information you provide must be accurate and complete. If any of your information changes at a later date, it is your responsibility to ensure that your Account is kept up-to-date.`,
                        `We require that you choose a strong password for your Account, consisting of a combination of lowercase and uppercase letters, special characters and numbers. It is your responsibility to keep your password safe. You must not share your Account with anyone else. If you believe your Account is being used without your permission, please contact us immediately at ${data.customerSupport}.`,
                        `We will not be liable for any unauthorised use of your Account.`,
                        `You must not use anyone else’s Account without the express permission of the User to whom the Account belongs.`,
                        `Any personal information provided in your Account will be collected, used and held in accordance with your rights and our obligations under the Data Protection Act.`,
                        `If you wish to close your Account, you may do so at any time. Closing your Account will result in the removal of your information. Closing your Account will also remove access to any areas of Our Site requiring an Account for access. In accordance with privacy policy, all data associated with your account will be removed when your account is closed.`
                    ]
                }
            },
            {
                title: `Website Intellectual Property Rights`,
                data: {
                    subPointers: [
                        `With the exception of User Content, all Content on Our Site and the copyright and other intellectual property rights subsisting in that Content, unless specifically labelled otherwise, belongs to or has been licensed by us. All Content (including User Content) is protected by applicable Canadian and international intellectual property laws and treaties.`,
                        `Subject to the licence granted to Us hereunder, Users retain the ownership of copyright and other intellectual property rights subsisting in User Content submitted by them (unless any part of such User Content is owned by a third party who has given their express permission for their material to be used in the User Content).`,
                        {
                            intro: `For personal use (including research and private study) only, you may:`,
                            subPointers: [
                                `Access, view and use Our Site in a web browser (including any web browsing capability built into other types of software or app).`,
                                `Download any Content where we have provided a link enabling you to do so.`,
                                `Download Our Site (or any part of it) for caching.`,
                                `Save pages from Our Site for later and/or offline viewing.`,
                                `View and use User Content in accordance with the permissions displayed with that User Content.`
                            ]
                        },
                        `You may not use any Content (including User Content) downloaded, copied, clipped, printed or otherwise saved from Our Site for commercial purposes without first obtaining a licence to do so from Us, our licensors, or from the relevant User, as appropriate. This does not prohibit the normal access, viewing and use of Our Site for general information purposes whether by business users or consumers.`,
                        `You may not systematically copy Content from Our Site with a view to creating or compiling any form of comprehensive collection, compilation, directory, or database unless given our express permission to do so.`,
                        `You may not otherwise reproduce, copy, distribute, sell, rent, sub-licence, store, or in any other manner re-use Content or any other material from Our Site unless clearly given express permission to do so.  For further information, please contact us at ${data.customerSupport}.`,
                        `Our status as the owner and author of the Content on Our Site (or that of identified licensors or Users, as appropriate) must always be acknowledged.`
                    ]
                }
            },
            {
                title: `User Intellectual Property Rights`,
                data: {
                    subPointers: [
                        `User Content included on Our Site and the copyright and other intellectual property rights subsisting in that User Content, unless specifically labelled otherwise, belongs to or has been licensed by the User identified along with that User Content. All User Content is protected by applicable Canadian and international intellectual property laws and treaties.`,
                        `Subject to the rights to use Our Site, Users may not otherwise copy, distribute, publicly perform, publicly display, reproduce, or create derivative works based upon, each other’s User Content, without first obtaining the express written permission of the User to whom the User Content in question belongs.`,
                        `Unless a particular User expressly states otherwise, the identity and ownership status of Users and User Content must always be acknowledged.`
                    ]
                }
            },
            {
                title: `User Content`,
                data: {
                    subPointers: [
                        `User Content on Our Site includes (but is not necessarily limited to) cause profiles, cause event pages, fundraising pages, team pages, donor names and messages.`,
                        `An Account is required if you wish to submit User Content.`,
                        `You agree that you will be solely responsible for your User Content. Specifically, you agree, represent and warrant that you have the right to submit the User Content and that all such User Content will comply with Our Acceptable Usage Policy.`,
                        `You (or your licensors, as appropriate) retain ownership of your User Content and all intellectual property rights subsisting therein. By submitting User Content, you grant Us an unconditional, non-exclusive, fully transferable, royalty-free, perpetual, irrevocable, worldwide licence to use, store, archive, syndicate, publish, transmit, adapt, edit, reproduce, distribute, prepare derivative works from, display, perform and sub-licence your User Content for the purposes of operating and promoting Our Site.`,
                        `If you wish to remove User Content, you may do so by completing the Close Account form in your account. We will use reasonable efforts to remove the User Content in question from Our Site. Removing User Content also revokes the licence granted to us to use that User Content. Please note, however, that caching or references to your User Content may not be made immediately unavailable (or may not be made unavailable at all where they are outside of our reasonable control).`,
                        `We may reject, reclassify, or remove any User Content from Our Site where, in our sole opinion, it violates Our Acceptable Usage Policy, or if we receive a complaint from a third party and determine that the User Content in question should be removed as a result.`,
                    ]
                }
            },
            {
                title: `Acceptable Usage Policy`,
                data: {
                    subPointers: [
                        {
                            title: `You may only use Our Site in a manner that is lawful and that complies with the provisions of this Clause. Specifically;`,
                            subPointers: [
                                `You must ensure that you comply fully with any and all applicable local, national, and international laws and/or regulations.`,
                                `You must not use Our Site in any way, or for any purpose, that is unlawful or fraudulent.`,
                                `You must not use Our Site to knowingly send, upload, or in any other way transmit data that contains any form of virus or other malware, or any other code designed to adversely affect computer hardware, software, or data of any kind.`,
                                `You must not use Our Site in any way, or for any purpose, that is intended to harm any person or persons in any way.`
                            ]
                        },
                        {
                            title: `When submitting User Content (or communicating in any other way using Our Site), you must not submit, communicate or otherwise do anything that:`,
                            subPointers: [
                                `Is sexually explicit.`,
                                `Is obscene, deliberately offensive, hateful, or otherwise inflammatory.`,
                                `Promotes violence.`,
                                `Promotes or assists in any form of unlawful activity.`,
                                `Discriminates against, or is in any way defamatory of, any person, group or class of persons, race, sex, religion, nationality, disability, sexual orientation, or age.`,
                                `Is intended or otherwise likely to threaten, harass, annoy, alarm, inconvenience, upset, or embarrass another person.`,
                                `Is calculated or otherwise likely to deceive.`,
                                `Is intended or otherwise likely to infringe (or threaten to infringe) another person’s right to privacy.`,
                                `Misleadingly impersonates any person or otherwise misrepresents your identity or affiliation in a way that is calculated to deceive (obvious parodies are not included within this definition provided that they do not fall within any of the other provisions of this sub-Clause.`,
                                `Implies any form of affiliation with us where none exists;`,
                                `Infringes, or assists in the infringement of, the intellectual property rights (including, but not limited to, copyright, patents, trademarks and database rights) of any other party.`,
                                `Is in breach of any legal duty owed to a third party including, but not limited to, contractual duties and duties of confidence.`
                            ]
                        },
                        {
                            title: `We reserve the right to suspend or terminate your Account and/or your access to Our Site if you materially breach the provisions of this Clause or any of the other provisions of these Terms and Conditions. Specifically, We may take one or more of the following actions:`,
                            subPointers: [
                                `Suspend, whether temporarily or permanently, your Account and/or your right to access Our Site.`,
                                `Remove any of your User Content which violates this Acceptable Usage Policy.`,
                                `Issue you with a written warning.`,
                                `Take legal proceedings against you for reimbursement of any and all relevant costs on an indemnity basis resulting from your breach.`,
                                `Take further legal action against you as appropriate.`,
                                `Disclose such information to law enforcement authorities as required or as We deem reasonably necessary.`,
                                `Any other actions which we deem reasonably appropriate (and lawful).`
                            ]
                        },
                        {
                            title: `We hereby exclude any and all liability arising out of any actions (including, but not limited to those set out above) that we may take in response to breaches of these Terms and Conditions.`
                        }
                    ]
                }
            },
            {
                title: `Links To Our Site`,
                data: {
                    subPointers: [
                        {
                            title: `You may link to Our Site provided that:`,
                            subPointers: [
                                `You do so in a fair and legal manner.`,
                                `You do not do so in a manner that suggests any form of association, endorsement or approval on Our part where none exists.`,
                                `You do not use any logos or trademarks displayed on Our Site without Our express written permission.`,
                                `You do not do so in a way that is calculated to damage our reputation or to take unfair advantage of it.`
                            ]
                        },
                        {
                            title: `You may not link to Our Site from any other site the content of which contains material that:`,
                            subPointers: [
                                `Is sexually explicit.`,
                                `Is obscene, deliberately offensive, hateful or otherwise inflammatory.`,
                                `Promotes violence.`,
                                `Promotes or assists in any form of unlawful activity.`,
                                `Discriminates against, or is in any way defamatory of, any person, group or class of persons, race, sex, religion, nationality, disability, sexual orientation, or age.`,
                                `Is intended or is otherwise likely to threaten, harass, annoy, alarm, inconvenience, upset, or embarrass another person.`,
                                `Is calculated or is otherwise likely to deceive.`,
                                `Is intended or is otherwise likely to infringe (or to threaten to infringe) another person’s privacy.`,
                                `Misleadingly impersonates any person or otherwise misrepresents the identity or affiliation of a particular person in a way that is calculated to deceive (obvious parodies are not included in this definition provided that they do not fall within any of the other provisions of this sub-Clause 9.4).`,
                                `Implies any form of affiliation with Us where none exists.`,
                                `Infringes, or assists in the infringement of, the intellectual property rights (including, but not limited to, copyright, patents, trademarks and database rights) of any other party`,
                                `Is made in breach of any legal duty owed to a third party including, but not limited to, contractual duties and duties of confidence.`
                            ]
                        },
                        {
                            title: `The content restrictions in this clause does not apply to content submitted to sites by other users provided that the primary purpose of the site accords with this provisions. You are not, for example, prohibited from posting links on general-purpose social networking sites merely because another user may post such content. You are, however, prohibited from posting links on websites which focus on or encourage the submission of such content from users.`
                        }
                    ]
                }
            },
            {
                title: `Our Liability`,
                data: {
                    subPointers: [
                        `To the fullest extent permissible by law, We accept no liability to any User for any loss or damage, whether foreseeable or otherwise, in contract, tort (including negligence), for breach of statutory duty, or otherwise, arising out of or in connection with the use of (or inability to use) Our Site or the use of or reliance upon any Content (whether it is provided by Us or whether it is User Content) included on Our Site.`,
                        `To the fullest extent permissible by law, we exclude all representations, warranties, and guarantees (whether express or implied) that may apply to Our Site or any Content (including User Content) included on Our Site.`,
                        `Our Site is intended for non-commercial use only. If you are a business user, we accept no liability for loss of profits, sales, business or revenue; loss of business opportunity, goodwill or reputation; loss of anticipated savings; business interruption; or for any indirect or consequential loss or damage.`,
                        `We exercise all reasonable skill and care to ensure that Our Site is free from viruses and other malware. We accept no liability for any loss or damage resulting from a virus or other malware, a distributed denial of service attack, or other harmful material or event that may adversely affect your hardware, software, data or other material that occurs as a result of your use of Our Site (including the downloading of any Content (including User Content) from it) or any other site referred to on Our Site.`,
                        `We neither assume nor accept responsibility or liability arising out of any disruption or non-availability of Our Site resulting from external causes including, but not limited to, ISP equipment failure, host equipment failure, communications network failure, natural events, acts of war, or legal restrictions and censorship.`,
                        `Nothing in these Terms and Conditions excludes or restricts our liability for fraud or fraudulent misrepresentation, for death or personal injury resulting from negligence, or for any other forms of liability which cannot be excluded or restricted by law. For full details of consumers’ legal rights, including those relating to digital content, please contact your local Citizens’ Advice Bureau or Trading Standards Office.`
                    ]
                }
            },
            {
                title: `Termination`,
                data: {
                    intro: `We reserve the right, at its sole discretion, to immediately and without notice suspend or permanently deny your access to all or part of the Website and associated services. The obligations contained herein will continue to apply to your past use. Upon termination or suspension or denial of access to the Website and associated services, funds already received on your behalf by us will be handled in accordance with the provisions above, provided that any potential payment (where applicable) may be delayed where we conduct an investigation regarding your use of the Website and associated services and we may decide to refuse to pay funds across to you where you have breached these Terms. In such circumstances we may authorise a refund of donations to donors.`
                }
            }
        ]
    }
};

export const privacy = {
    title: `PRIVACY AND SECURITY POLICY`,
    content: {
        intro: `We are committed to providing you with quality services and to respecting your privacy. This Privacy Policy describes our policies and procedures on collecting, using, and disclosing your information when you use our websites, programs or services.`,
        pointers: [
            {
                title: `GENERAL`,
                data: {
                    subPointers: [
                        `Please read this privacy policy carefully before using Our Site.`,
                        `This policy has been construed and shall be interpreted in accordance to the laws of Canada and international privacy protection laws.`,
                        {
                            intro: `Definitions`,
                            subPointers: [
                                `“We”, “Us”, “Our”, “Company” shall refer to Waaw Global Inc., our subsidiaries and affiliates, and any of our respective agents and third-party service providers (“service providers”).`,
                                `“You” means the individual accessing or using the Service, or the Company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.`
                            ]
                        }
                    ]
                }
            },
            {
                title: `Collection of Information`,
                data: {
                    subPointers: [
                        `We collect your personal information to maximize on quality service delivery to you, provide you with any additional or special information about our services and protect your account and personal information.`,
                        {
                            intro: `We may collect the following kinds of information when you, your colleagues, or other users access the Service:`,
                            subPointers: [
                                `Your contact information such as full name and email address.`,
                                `The Content, communications, and other information you provide when you use Our Service. This can include information in or about the Content you provide.`,
                                `User communications, feedback, suggestions, and ideas sent to you;`,
                                `Credit information.`,
                                `Information that you provide when you engage platform support regarding the Service.`
                            ]
                        },
                        `We may collect personal information about you from the information you provide to us when you fill out an Application or other forms on our site. We may also receive personal information about you from third-party services such as financial institutions and credit bureaus. Lastly, we may also collect personal information from individuals whose identity you share with us.`,
                        `You permit us to collect your personal information at any time, before, during, and after engaging in a business relationship with us.`,
                        `Our servers also collect information from you, such as your domain name, websites you visit, and Internet Protocol address. This information is not personally identifiable. However, when you respond to questions or communicate with us, your personal information may be collected.`
                    ]
                }
            },
            {
                title: `Use of Information`,
                data: {
                    subPointers: [
                        {
                            intro: `Where it is in our legitimate interest to do so, we may use your personal information to:`,
                            subPointers: [
                                `To effectively manage Your Account: to manage Your registration as a user of the Our services.`,
                                `To provide you with details about our services by email, text, phone and through other communication methods.`,
                                `To carry out financial and identity checks, fraud prevention checks, regulatory checks, and credit checks.`,
                                `To carry out product development, statistical analysis, and market research.`,
                                `To develop and improve our services.`,
                                `To update our records.`,
                                `To carry out checks required by applicable regulation or regulatory guidance.`,
                                `To improve our relationship with you by making the website available to you in a user-friendly way, and to identify services you may be interested in.`,
                                `For customer service, including answering questions and responding to feedback and complaints.`,
                                `For any other specific purposes in relation to your activities via the Platform;`,
                                `Where you have given us consent, we shall provide you with information about any new services, promotions, and other information that we think will be of interest to you. You can withdraw your consent at any time, but without affecting the lawfulness of processing based on consent before its withdrawal. You can update your details or change your privacy preferences by contacting us via the details given in the "Contact Us" section below.`,
                            ]
                        },
                        `We may use your email address to communicate with you. Upon your consent, we may direct electronic email communication to you about our services or market new services. We may also ask to seek your feedback on the services we offer. You have an option to opt-out of such electronic communication. Lastly, we may track your email activity to check the effectiveness of the communication.`
                    ]
                }
            },
            {
                title: `SHARING PERSONAL INFORMATION`,
                data: {
                    subPointers: [
                        `We won’t share your personal information.`,
                        {
                            intro: `We may disclose your personal information to third parties where it is in our legitimate interest to do so, including the following reasons:`,
                            subPointers: [
                                `We may share your information with analytics and search engine providers that assist us in the improvement and optimization of our site.`,
                                `We may share your personal information with companies and other third parties performing services on our behalf (for example, credit reference agencies, customer relationship management providers, or other service providers) who will only use the information to provide that Service. We may also share your personal information with other members of our corporate group.`,
                                `We may share alerts and information derived from identity verification checks with third parties for anti-money laundering and fraud prevention.`,
                                `We may disclose your personal information on request to the police or any other regulator or government authority to fulfil our regulatory responsibilities, to help prevent or detect fraud or any other type of crime, or for any other reasonable purpose identified by the relevant authority.`,
                                `Except as set out in this privacy policy; we will not sell or disclose your data to any third party.`,
                                `We may share your information in the event of a merger, acquisition, or sale of our assets. We shall communicate with you in the event of such a change.`,
                            ]
                        }
                    ]
                }
            },
            {
                title: `Analytics`,
                data: {
                    subPointers: [
                        `We may use third-party Service providers to monitor and analyses the use of our Website.`,
                        `One such service provider is Google. Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Program and Site. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its advertising network.`,
                        `You may opt-out of certain Google Analytics features through your mobile device settings, such as your device advertising settings, or by following the instructions provided by Google in their Privacy Policy: “https://policies.google.com/privacy”.`,
                        `For more information on Google's privacy practices, please visit the Google Privacy & Terms web page: “https://policies.google.com/privacy”.`
                    ]
                }
            },
            {
                title: `LINKS TO OTHER WEBSITES`,
                data: {
                    subPointers: [
                        `Our Program and Site may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.`,
                        `We have no control over and assume no responsibility for the Content, privacy policies, or practices of any third-party sites or services.`
                    ]
                }
            },
            {
                title: `SECURITY OF YOUR PERSONAL INFORMATION`,
                data: {
                    subPointers: [
                        `The security of Your Personal Data is important to us but remember that no transmission method over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect Your Personal Data, we cannot guarantee its absolute security.`,
                        `We restrict access to the information obtained from our websites and web pages to our employees, agents, Affiliates, Partners and contractors. We maintain physical, electronic, and procedural safeguards designed to protect personal information to the extent reasonably possible.`
                    ]
                }
            },
            {
                title: `VIRUSES, MALWARE AND SECURITY`,
                data: {
                    subPointers: [
                        `We exercise all reasonable skill and care to ensure that Our Site is secure and free from viruses and other malware. We do not, however, guarantee that Our Site is secure or free from viruses or other malware and accept no liability in respect of the same.`,
                        `You are responsible for protecting your hardware, software, data and other material from viruses, malware, and other internet security risks.`,
                        `You must not deliberately introduce viruses or other malware, or any other material which is malicious or technologically harmful either to or via Our Site.`,
                        `You must not attempt to gain unauthorized access to any part of Our Site, the server on which Our Site is stored, or any other server, computer, or database connected to Our Site.`,
                        `You must not attack Our Site by means of a denial of service attack, a distributed denial of service attack, or by any other means.`,
                        `By breaching the provisions of this clause, you may be committing a criminal offence under the Computer Misuse Act 1990. Any and all such breaches will be reported to the relevant law enforcement authorities and we will cooperate fully with those authorities by disclosing your identity to them. Your right to use Our Site will cease immediately in the event of such a breach.`
                    ]
                }
            },
            {
                title: `CONSENT REQUESTS AND PREFERENCES`,
                data: {
                    subPointers: [
                        `You may request us to identify the personal information we have collected and kept on our servers. To make such a request, contact us through our email provided below.`,
                        `You may contact us to cancel, withdraw, or restrict the amount and type of information we collect and keep. We may keep on using some of your personal information even after your withdrawal if the information is necessary to run your account or fulfil legal obligations. We may also stop providing services that we would only give if we had the information you have withdrawn.`
                    ]
                }
            },
            {
                title: `GDPR DATA PROTECTION RIGHTS`,
                data: {
                    intro: `To make sure that you are fully aware of all of your data protection rights, every user is entitled to the following:`,
                    subPointers: [
                        {
                            intro: `The right to access`,
                            description: `You have the right to request copies of your personal data. We may charge you a small fee for this service.`
                        },
                        {
                            intro: `The right to rectification`,
                            description: `You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.`
                        },
                        {
                            intro: `The right to erasure`,
                            description: `You have the right to request that we erase your personal data, under certain conditions.`
                        },
                        {
                            intro: `The right to restrict processing`,
                            description: `You have the right to request that we restrict the processing of your personal data, under certain conditions.`
                        },
                        {
                            intro: `The right to object to processing`,
                            description: `You have the right to object to our processing of your personal data, under certain conditions.`
                        },
                        {
                            intro: `The right to data portability`,
                            description: `You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.`
                        }
                    ],
                    conclusion: `If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`
                }
            },
            {
                title: `CHANGES TO PRIVACY POLICY`,
                data: {
                    subPointers: [
                        `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.`,
                        `We will let you know via email or a prominent notice on Our Program and Site before or when the changes become effective and update the "Last Updated" date at the top of this Privacy Policy.`,
                        `You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are significant when they are posted on this page.`
                    ]
                }
            },
            {
                title: `CONTACT US`,
                data: {
                    intro: `If you have any questions about the provisions in this Privacy Policy, you can contact us:`,
                    conclusion: `By Email: ${data.customerSupport}`
                }
            }
        ]
    }
}

export const cookies = {
    title: `TRACKING TECHNOLOGIES AND COOKIES.`,
    content: {
        pointers: [
            {
                data: {
                    intro: `We use cookies and similar tracking technologies to track the activity on Our Service and store certain information. You can instruct your browser to refuse all Cookies or to indicate when a cookie is being sent. However, if you do not accept Cookies, You may not be able to use some parts of our Program or Site.`
                }
            },
            {
                data: {
                    intro: `Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when you go offline, while Session Cookies are deleted as soon as you close your web browser.`,
                    subPointers: [
                        {
                            intro: `We use both session and persistent cookies for the purposes set out below:`,
                            subPointers: [
                                `"Necessary / Essential Cookies":  These Cookies are essential to provide you with services available through the Website and enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services you have asked for cannot be provided, and we only use these Cookies to give you those services.`,
                                `"Cookies Policy / Notice Acceptance Cookies":  These Cookies identify if users have accepted the use of cookies on the Website.`,
                                `"Functionality Cookies":  These cookies allow us to remember choices you make when you use the Website, such as remembering your login details or language preference. The purpose of these cookies is to provide you with more personal experience and to avoid you having to re-enter your preferences every time you use the Website.`,
                                `"Tracking and Performance Cookies":  These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the data collected is typically linked to a pseudonymous identifier associated with the Device You use to access the Website. We may also use these cookies to test new advertisements, pages, features, or new functionality of the Website to see how our users react to them.`
                            ]
                        }
                    ]
                }
            },
        ]
    }

}

export const disclaimer = {
    title: `DISCLAIMER AND LEGAL RIGHTS`,
    content: {
        pointers: [
            {
                data: {
                    intro: `Nothing on Our Site constitutes advice on which you should rely. It is provided for general information purposes only. Professional or specialist advice should always be sought before taking any action relating to any information provided on our site.`,
                }
            },
            {
                data: {
                    intro: `Insofar as is permitted by law, We make no representation, warranty, or guarantee that Our Site will meet your requirements, that it will not infringe the rights of third parties, that it will be compatible with all software and hardware, or that it will be secure.`,
                }
            },
            {
                data: {
                    intro: `If, as a result of our failure to exercise reasonable care and skill, any digital content from Our Site created by us (that is not User Content) damages your device or other digital content belonging to you, you may be entitled to certain legal remedies. For more details concerning your rights and remedies as a consumer, please contact your local Citizens Advice Bureau or Trading Standards Office.`,
                }
            },
            {
                data: {
                    intro: `We make reasonable efforts to ensure that Our Content on Our Site is complete, accurate, and up-to-date. We do not, however, make any representations, warranties or guarantees (whether express or implied) that such Content is complete, accurate, or up-to-date.`,
                }
            },
            {
                data: {
                    intro: `We are not responsible for the content or accuracy of, or for any opinions, views, or values expressed in User Content. Any such opinions, views, or values are those of the relevant User and do not reflect our opinions, views, or values in any way.`
                }
            }
        ]
    }
}

export const nda = {
    title: `CONFIDENTIALITY AND NON- DISCLOSURE`,
    content: {
        intro: `For purposes of this Agreement, "Confidential Information" shall mean information or material proprietary to a Party or designated as confidential by such Party (the “Disclosing Party”), as well as information about which a Party (the “Receiving Party”) obtains knowledge or access, through or as a result of this Agreement. Confidential Information does not include:`,
        pointers: [
            {
                data: {
                    intro: `Information that is or becomes publicly known without restriction and without breach of this Contract or that is generally employed by the trade at or after the time the Receiving Party first learns of such information.`
                }
            },
            {
                data: {
                    intro: `Generic information or knowledge which the Receiving Party would have learned in the course of similar employment, interaction or work elsewhere in the trade.`
                }
            },
            {
                data: {
                    intro: `Information the Receiving Party lawfully receives from a third party without restriction on disclosure and without breach of a non-disclosure obligation.`
                }
            },
            {
                data: {
                    intro: `information the Receiving Party rightfully knew prior to receiving such information from the Disclosing Party to the extent such knowledge was not subject to restrictions on further disclosure.`
                }
            },
            {
                data: {
                    intro: `Information the Receiving Party develops independent of any information originating from the Disclosing Party.`
                }
            }
        ],
        paragraphs: [
            {
                title: `NON- DISCLOSURE`,
                description: `The Parties hereby agree that during the term hereof and at all times thereafter, and except as specifically permitted herein or in a separate writing signed by the Disclosing Party, the Receiving Party shall not use, commercialize or disclose Confidential Information to any person or entity. At any time upon the request of the Disclosing Party, the Receiving Party shall return to the Disclosing Party all Confidential Information, including all notes, data, reference materials, sketches, drawings, memorandums, documentations and records which in any way incorporate Confidential Information. Confidential information that cannot be returned such as word of mouth shall be kept confidential at all times indefinitely.`
            },
            {
                title: `LIABILITY CLAUSE `,
                description: `Recipient hereby further agrees that, in the event of its breach or threatened breach of this Agreement, the Disclosing Party would suffer irreparable harm and the Disclosing Party’s remedies shall include, in addition to any other remedies available at law or in equity, equitable remedies such as specific performance and injunctive relief and shall not be limited to monetary damages. Specifically, the Disclosing Party shall be entitled to seek immediate injunctive relief prohibiting such violation.`
            },
            {
                title: `JURISDICTION AND GOVERNING LAWS`,
                description: `This agreement has been made, interpreted and construed in accordance with the law of CANADA.`
            }
        ]
    }
}