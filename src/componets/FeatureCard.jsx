import { cn } from "../utils/utils";

const FeatureCard = ({ children, className }) => {
    return (
        <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
            {children}
        </div>
    );
};

export default FeatureCard;
