function Error({ message }: { message: string }) {
    return (
        <p className='error'>
            <span>💥</span> There was an error fetching questions: {message}
        </p>
    );
}

export default Error;
