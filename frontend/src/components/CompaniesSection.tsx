import CompaniesSectionStyles from '../styles/CompaniesSectionStyles';
import { alibaba, youtube, amazon, jumia, zawadi} from '../assets/index';

const CompaniesSection: React.FC = () => {

    return (
        <>
            <section className={CompaniesSectionStyles.section}>
                <h2 className={CompaniesSectionStyles.title}>Trusted By</h2>
                <div className={CompaniesSectionStyles.logoContainer}>
                    <img src={alibaba} alt="Alibaba" className={CompaniesSectionStyles.logo} />
                    <img src={youtube} alt="Youtube" className={CompaniesSectionStyles.logo} />
                    <img src={amazon} alt="Amazon" className={CompaniesSectionStyles.logo} />
                    <img src={jumia} alt="Jumia" className={CompaniesSectionStyles.logo} />
                    <img src={zawadi} alt="Zawadi" className={CompaniesSectionStyles.logo} />
                </div>
            </section>
        </>
    );
}
export default CompaniesSection;