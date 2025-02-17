import moment from 'moment';

const Footer = () => {
    return (
        <div className="bg-[#025195] lg:py-3 md:py-[10px] py-2 px-3">
            <h3 className="text-center lg:text-lg md:text-base text-sm font-bold text-white">Copyright @{moment().format('YYYY')} Flashcard Learning App. All rights reserved.</h3>
        </div>
    );
};

export default Footer;